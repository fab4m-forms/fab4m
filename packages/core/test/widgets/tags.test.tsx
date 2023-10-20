import * as React from "react";
import { render, fireEvent, waitFor, cleanup } from "@testing-library/react";
import {
  basic,
  textField,
  selectWidget,
  tagsWidget,
  createForm,
  FormView,
  FormComponentView,
} from "../../src";

describe("Tags", () => {
  afterEach(cleanup);
  interface Data {
    options: string[];
    freeText: string[];
  }
  const form = createForm<Data>({
    options: textField({
      label: "Options",
      required: true,
      multiple: true,
      widget: selectWidget<string>([
        ["One", "one"],
        ["Two", "two"],
      ]),
      multipleWidget: tagsWidget({
        addOnChange: true,
        removeItemLabel: "Custom remove text",
      }),
    }),
    freeText: textField({
      label: "Free text",
      required: true,
      minItems: 1,
      maxItems: 3,
      multiple: true,
      multipleWidget: tagsWidget({
        addItemLabel: "Custom add text",
      }),
    }),
  });
  const useData = (data: Data): [Data, (newData: Partial<Data>) => void] => {
    return [
      data,
      (newData: Partial<Data>) => {
        data.freeText = newData.freeText ?? data.freeText;
        data.options = newData.options ?? data.options;
      },
    ];
  };

  afterEach(() => form.removeEventListeners());

  const renderForm = async (data: unknown) => {
    const { findByLabelText, queryByText, queryByLabelText } = render(
      <FormView data={data} form={form} />,
    );
    const optionsElement = (await findByLabelText(
      "Options",
    )) as HTMLSelectElement;
    const textElement = queryByLabelText("Free text") as HTMLInputElement;
    const addButton = queryByText("Custom add text");
    const removeOption = queryByText("Custom remove text");
    return {
      optionsElement,
      textElement,
      addButton,
      removeOption,
      queryByText,
    };
  };

  test("Add tags", async () => {
    const [data, changeData] = useData({
      options: [],
      freeText: [],
    });
    form.onDataChange(changeData);
    const controls = await renderForm(data);
    fireEvent.change(controls.optionsElement, {
      target: { value: "one" },
    });
    await waitFor(() => {
      expect(data.options[0]).toBe("one");
    });

    expect(controls.textElement).not.toBeNull();
    fireEvent.input(controls.textElement, { target: { value: "wat" } });
    expect(controls.addButton).not.toBeNull();
    if (controls.addButton) {
      fireEvent.click(controls.addButton);
      await waitFor(() => {
        expect(data.freeText[0]).toBe("wat");
      });
    }
  });

  test("Use select labels", async () => {
    const data = { options: ["one"], freeText: [] };
    const controls = await renderForm(data);
    // The label should be used, not the value.
    expect(controls.queryByText("one")).toBe(null);
    expect(controls.queryByText("One")).not.toBe(null);
  });

  test("Remove tag", async () => {
    const [data, changeData] = useData({ options: ["text"], freeText: [] });
    form.onDataChange(changeData);
    const controls = await renderForm(data);
    expect(controls.removeOption).not.toBeNull();
    if (controls.removeOption) {
      fireEvent.click(controls.removeOption);
      await waitFor(() => {
        expect((data.options as Array<unknown>).length).toBe(0);
      });
    }
  });

  test("Max items", async () => {
    const [data, changeData] = useData({
      options: [],
      freeText: ["text", "text2", "text3"],
    });
    form.onDataChange(changeData);
    const controls = await renderForm(data);
    expect(controls.textElement).toBeNull();
    expect(controls.addButton).toBeNull();
  });

  test("Disabled", async () => {
    const disabled = textField({
      label: "Options",
      multiple: true,
      disabled: true,
      widget: selectWidget<string>([
        ["One", "one"],
        ["Two", "two"],
      ]),
      multipleWidget: tagsWidget(),
    });
    const noOp = () => {
      // No-op
    };
    const { queryByText, queryByLabelText } = render(
      <FormComponentView
        theme={basic}
        name="options"
        value={["text", "text2", "text3"]}
        component={disabled}
        onChange={noOp}
      />,
    );
    expect(queryByLabelText("Options")).toBe(null);
    expect(queryByText("Remove")).toBe(null);
  });
});
