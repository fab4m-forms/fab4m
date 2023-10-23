import * as React from "react";
import "@testing-library/jest-dom";
import { vi } from "vitest";
import { fireEvent, render, waitFor } from "@testing-library/react";
import {
  textField,
  basic,
  FormComponentView,
  createForm,
  generateSchema,
  SchemaProperty,
  allowedValues,
  FormView,
  group,
  defaultMultipleWidget,
  StatefulFormView,
} from "../src";
import { getFormElement } from "./util";
import { validate } from "../src/schemaValidator";

describe("Multiple fields", () => {
  const multipleText = textField({
    multiple: true,
    name: "field1",
    label: "Text field 1",
    required: true,
  });
  let data = [""];
  const changeData = (value: unknown) => {
    data = value as string[];
  };
  test("Multiple items", async () => {
    const { findByText, findAllByLabelText, findAllByText } = render(
      <FormComponentView
        name="field1"
        onChange={changeData}
        component={multipleText}
        theme={basic}
        value={data}
      />,
    );
    const add = await findByText("Add");
    fireEvent.click(add);
    const fields = (await findAllByLabelText(
      "Text field 1",
    )) as HTMLInputElement[];
    expect(fields.length).toBe(2);
    expect(fields[0].name).toBe("field1[0]");
    expect(fields[1].name).toBe("field1[1]");
    expect(fields[0].id).toBe("field1-0");
    expect(fields[1].id).toBe("field1-1");
    fireEvent.input(fields[0], {
      value: "First element",
      target: { value: "First element" },
    });
    fireEvent.input(fields[1], {
      value: "Second element",
      target: { value: "Second element" },
    });
    await waitFor(() => {
      expect(data).toHaveLength(2);
      expect(data[0]).toBe("First element");
      expect(data[1]).toBe("Second element");
    });
    const removeButtons = await findAllByText("Remove");
    expect(removeButtons).toHaveLength(2);
    fireEvent.click(removeButtons[0]);
    await waitFor(() => {
      expect(data).toHaveLength(1);
      expect(data[0]).toBe("Second element");
    });
  });

  test("Multiple items with validators", async () => {
    const form = createForm({
      multiple: textField({
        label: "Multiple",
        multiple: true,
        minItems: 2,
        validators: [allowedValues(["one", "two"], "Not allowed")],
      }),
      multipleGroup: group(
        {
          label: "Group",
          multiple: true,
          minItems: 2,
        },
        {
          inGroup: textField({
            label: "In group",
            required: true,
            validators: [
              allowedValues(["allowed"], "Not allowed in group text"),
            ],
          }),
          multipleInGroup: textField({
            label: "Multiple in group",
            multiple: true,
            minItems: 2,
            validators: [
              allowedValues(
                ["one", "two"],
                "Not allowed in multiple group text",
              ),
            ],
          }),
          nestedGroup: group(
            {},
            {
              nested: textField({
                label: "Nested",
                required: true,
                multiple: true,
                validators: [
                  allowedValues(["allowed"], "Not allowed in nested"),
                ],
              }),
            },
          ),
        },
      ),
    });
    const { findAllByLabelText, findByText, container } = render(
      <FormView
        form={form}
        data={{
          multiple: ["one", "nope"],
          multipleGroup: [
            {
              inGroup: "nope",
              multipleInGroup: ["one", "nope"],
              nestedGroup: { nested: ["allowed", "not allowed"] },
            },
          ],
        }}
      />,
    );
    const formElement = getFormElement(container);
    fireEvent.submit(formElement);
    await waitFor(async () => {
      expect(
        (await findAllByLabelText("Multiple"))[1].parentElement?.parentElement
          ?.parentElement?.innerHTML,
      ).toMatch("Not allowed");
      expect(
        (await findByText("In group")).parentElement?.parentElement
          ?.parentElement?.innerHTML,
      ).toMatch("Not allowed in group text");
      expect(
        (await findAllByLabelText("Multiple in group"))[1].parentElement
          ?.parentElement?.parentElement?.innerHTML,
      ).toMatch("Not allowed in multiple group text");
      expect(
        (await findAllByLabelText("Nested"))[1].parentElement?.parentElement
          ?.parentElement?.innerHTML,
      ).toMatch("Not allowed in nested");
    });
  });

  test("Multiple labels", async () => {
    const form = createForm({
      multiple: textField({
        label: "Multiple",
        description: "Description",
        multiple: true,
      }),
    });
    const { findAllByText } = render(
      <FormView form={form} data={{ multipleLabels: ["First", "Second"] }} />,
    );
    expect(await (await findAllByText("Description")).length).toBe(1);
  });

  test("Render description only once", async () => {
    const form = createForm({
      multipleLabels: textField({
        label: "Multiple labels",
        multiple: true,
        minItems: 2,
        multipleWidget: defaultMultipleWidget({ multipleLabels: true }),
      }),
    });
    const { findAllByText } = render(
      <FormView form={form} data={{ multipleLabels: ["First", "Second"] }} />,
    );
    expect(await (await findAllByText("Multiple labels")).length).toBe(2);
  });

  test("Render a default number of multiple items", async () => {
    const form = createForm({
      textFields: textField({
        label: "Text Fields",
        multiple: true,
        multipleWidget: defaultMultipleWidget({ defaultNoItems: 2 }),
      }),
    });
    const { findAllByLabelText, debug } = render(
      <FormView form={form} data={{}} />,
    );
    expect(await findAllByLabelText("Text Fields")).toHaveLength(2);
  });

  test("Multiple items schema", async () => {
    const form = createForm();
    form.add(multipleText);
    form.add(
      textField({
        label: "Not multiple",
        name: "not_multiple",
      }),
    );
    const schema = generateSchema(form);
    expect(schema.properties.not_multiple.type).toBe("string");
    expect(schema.properties.field1.type).toBe("array");
    if (schema.properties.field1.type === "array") {
      expect((schema.properties.field1.items as SchemaProperty).type).toBe(
        "string",
      );
    }
    const valid = validate(form, {
      field1: ["One", "Two", "Three"],
      not_multiple: "Text",
    });
    const invalid = validate(form, { field1: "wat", not_multiple: "Text" });
    expect(valid.valid).toBe(true);
    expect(invalid.valid).toBe(false);
  });
  test("Min and max items in widget", async () => {
    multipleText.minItems = 2;
    multipleText.maxItems = 4;
    const { findByText, findAllByLabelText, queryByText, queryAllByText } =
      render(
        <FormComponentView
          name="field1"
          onChange={changeData}
          component={multipleText}
          theme={basic}
        />,
      );
    const elements = await findAllByLabelText("Text field 1");
    expect(elements).toHaveLength(2);
    expect(queryAllByText("Remove")).toHaveLength(0);
    const addMore = await findByText("Add");
    fireEvent.click(addMore);
    await waitFor(() => {
      expect(queryByText("Add")).not.toBeNull();
      expect(queryAllByText("Remove").length).toBeGreaterThan(0);
    });
    fireEvent.click(addMore);
    await waitFor(() => {
      expect(queryByText("Add")).toBeNull();
    });
  });
  test("Empty field with min items that isn't required should work with empty array", async () => {
    const submit = vi.fn().mockImplementation((e: React.FormEvent) => {
      e.preventDefault();
    });
    const form = createForm(
      {
        multiple: textField({
          label: "Multiple",
          minItems: 1,
          multiple: true,
        }),
      },
      { title: "Multiple form" },
    ).onSubmit(submit);
    const { queryByText, findByRole } = render(
      <StatefulFormView form={form} data={{ multiple: [] }} />,
    );
    const formElement = await findByRole("form");
    fireEvent.submit(formElement);
    await waitFor(() => {
      expect(submit).toHaveBeenCalled();
      expect(queryByText("must have at least")).toBeNull();
    });
  });
  test("Min and max items schema", () => {
    multipleText.minItems = 2;
    multipleText.maxItems = 4;
    const form = createForm();
    form.add(multipleText);
    const tooFew = validate(form, { field1: ["one"] });
    const tooMany = validate(form, {
      field1: ["one", "two", "three", "four", "five"],
    });
    const valid = validate(form, { field1: ["one", "two"] });
    expect(tooFew.valid).toBe(false);
    expect(tooMany.valid).toBe(false);
    expect(valid.valid).toBe(true);
  });
});
