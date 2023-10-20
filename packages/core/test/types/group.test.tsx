import * as React from "react";

import { fireEvent, render, waitFor } from "@testing-library/react";
import {
  textField,
  basic,
  group,
  FormComponentView,
  createForm,
  serialize,
  unserialize,
  textFieldType,
  groupType,
  fieldsetWidget,
  equals,
  StatefulFormView,
  textFieldWidgetType,
  fieldsetWidgetType,
  groupWidgetType,
  allowedValues,
  detailsWidget,
  SerializedComponent,
  SerializedComponentsList,
  FormComponent,
} from "../../src";
import { getFormElement } from "../util";
interface GroupedData {
  field1: string;
  field2: string;
  multiple: string[];
}

describe("groups", () => {
  const field1 = textField({
    name: "field1",
    label: "Text field 1",
    required: true,
  });
  const field2 = textField({
    name: "field2",
    label: "Text field 2",
    required: true,
  });
  const multiple = textField({
    name: "multiple",
    label: "Multiple text",
    multiple: true,
  });

  const groupItem = group(
    { name: "group", label: "Group with fields" },
    { field1, field2, multiple },
  );

  let data: GroupedData = {
    field1: "Text",
    field2: "Other text",
    multiple: ["test", "test2", "test3"],
  };

  const changeData = (value: unknown) => {
    data = value as GroupedData;
  };

  function getComponents(
    components: SerializedComponentsList,
  ): SerializedComponent[] {
    return components.filter((c) => !Array.isArray(c)) as SerializedComponent[];
  }

  test("grouped items", async () => {
    const { findByLabelText, findAllByLabelText } = render(
      <FormComponentView
        name="group"
        onChange={changeData}
        component={groupItem}
        theme={basic}
        value={data}
      />,
    );
    const field1 = (await findByLabelText("Text field 1")) as HTMLInputElement;
    const field2 = (await findByLabelText("Text field 2")) as HTMLInputElement;
    const multipleField = (await findAllByLabelText(
      "Multiple text",
    )) as HTMLInputElement[];
    expect(field1.value).toBe("Text");
    expect(field2.value).toBe("Other text");
    expect(field1.name).toBe("group[field1]");
    expect(field2.name).toBe("group[field2]");
    expect(field1.id).toBe("group_field1");
    expect(field2.id).toBe("group_field2");
    expect(multipleField[0].name).toBe("group[multiple][0]");
    expect(multipleField[1].id).toBe("group_multiple-1");
  });

  test("fieldset widget", async () => {
    groupItem.widget = fieldsetWidget();
    const { findByLabelText, findByText } = render(
      <FormComponentView
        name="group"
        onChange={changeData}
        component={groupItem}
        theme={basic}
        value={data}
      />,
    );
    const legend = await findByText("Group with fields");
    const field1 = (await findByLabelText("Text field 1")) as HTMLInputElement;
    const field2 = (await findByLabelText("Text field 2")) as HTMLInputElement;
    expect(legend).toContainHTML("Group with fields");
    expect(field1.value).toBe("Text");
    expect(field2.value).toBe("Other text");
  });

  test("serialized group field form", async () => {
    const form = createForm();
    form.add(groupItem);
    const serializedForm = serialize(form);
    const components = getComponents(serializedForm.components);

    expect(components[0].components).toBeDefined();
    if (components[0].components) {
      const groupComponents = components[0].components as SerializedComponent[];
      expect(groupComponents[0].type).toBe("text");
      expect(groupComponents[0].type).toBe("text");
    }
    const unserialized = unserialize(
      serializedForm,
      [groupType, textFieldType],
      [basic],
      [fieldsetWidgetType, groupWidgetType, textFieldWidgetType],
      [],
      [],
      [],
    );
    const unserializedComponents = !Array.isArray(unserialized.components[0])
      ? (unserialized.components[0].components as FormComponent[])
      : [];
    expect(unserializedComponents).toBeDefined();
    if (unserializedComponents) {
      expect(unserializedComponents[0].type.name).toBe("text");
      expect(unserializedComponents[1].type.name).toBe("text");
    }
  });

  test("Rules in grouped components", async () => {
    const form = createForm();
    form.add(
      textField({
        name: "outside_group",
        label: "Outside group",
      }),
    );
    form.add(
      group({ name: "group", label: "group" }, [
        textField({
          name: "inside_group",
          label: "Inside group",
          rules: [["outside_group", equals("outside")]],
        }),
      ]),
    );
    const { queryByLabelText, findByLabelText } = render(
      <StatefulFormView form={form} />,
    );
    expect(queryByLabelText("Inside group")).toBe(null);
    const outside = (await findByLabelText(
      "Outside group",
    )) as HTMLInputElement;
    fireEvent.input(outside, {
      value: "outside",
      target: { value: "outside" },
    });
    await waitFor(async () => {
      expect(queryByLabelText("Inside group")).not.toBe(null);
    });
  });
  test("Validators in grouped components", async () => {
    const form = createForm();
    form.add(
      group({ name: "group", label: "group" }, [
        textField({
          name: "inside_group",
          label: "Inside group",
          validators: [allowedValues(["inside"], "Not allowed")],
        }),
      ]),
    );
    const { queryByText, findByLabelText, container } = render(
      <StatefulFormView form={form} />,
    );
    const formElement = getFormElement(container);
    const field = (await findByLabelText("Inside group")) as HTMLInputElement;
    fireEvent.input(field, {
      value: "not inside",
      target: { value: "Not inside" },
    });
    await waitFor(async () => {
      expect(field.value).toBe("Not inside");
    });
    fireEvent.submit(formElement);
    await waitFor(async () => {
      // The error must be within the right component.
      expect(queryByText("Not allowed")).not.toBeNull();
    });
  });
  const widget = detailsWidget();
  const detailsForm = createForm({
    group: group(
      {
        label: "Details label",
        widget,
      },
      { field1, field2 },
    ),
  });
  test("Details widget", async () => {
    const { queryByText, findByLabelText } = render(
      <StatefulFormView form={detailsForm} />,
    );
    expect(queryByText("Details label")).not.toBe(null);
    expect(await findByLabelText("Text field 1")).not.toBeVisible();
    expect(await findByLabelText("Text field 2")).not.toBeVisible();
  });
  test("Details widget with html summary", () => {
    widget.settings = { summary: <span data-testid="details-span"></span> };
    const { queryByText, queryByTestId } = render(
      <StatefulFormView form={detailsForm} />,
    );
    expect(queryByText("Details label")).toBe(null);
    expect(queryByTestId("details-span")).not.toBe(null);
  });
  test("Details widget with group content", () => {
    widget.settings = {
      summary: (data) => <span>label: {data?.field1}</span>,
    };
    const { queryByText } = render(
      <StatefulFormView
        form={detailsForm}
        data={{ group: { field1: "Value" } }}
      />,
    );
    expect(queryByText("label: Value")).not.toBe(null);
  });
  test("Details widget with open content", async () => {
    widget.settings = {
      open: true,
    };
    const { findByLabelText } = render(
      <StatefulFormView
        form={detailsForm}
        data={{ group: { field1: "Value" } }}
      />,
    );
    expect(await findByLabelText("Text field 1")).toBeVisible();
    expect(await findByLabelText("Text field 2")).toBeVisible();
  });
});
