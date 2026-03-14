import * as React from "react";
import { fireEvent, waitFor } from "@testing-library/react";
import { FormView, FormComponentView } from "../../src";
import {
  basic,
  textField,
  selectWidget,
  integerField,
  createForm,
  FormComponentWithName,
} from "@fab4m/fab4m";
import { inputElementOk, renderWithProvider } from "../util";


describe("Select", () => {
  const texts = textField({
    name: "texts",
    label: "Texts",
    widget: selectWidget<string>([["One", "one"], ["Two", "two"], "three"], {
      notSelectedLabel: "- Pick one -",
    }),
    validators: [],
  });
  const numbers = integerField({
    name: "numbers",
    label: "Numbers",
    widget: selectWidget<number>([["Zero", 0], ["One", 1], 2]),
  });
  const form = createForm();
  form.add(texts as FormComponentWithName);
  form.add(numbers as FormComponentWithName);
  let data: Record<string, unknown> = { texts: "", numbers: "" };
  form.onDataChange((value) => {
    data = value;
  });
  test("Select choices", async () => {
    const { findByLabelText, findByText } = renderWithProvider(
      <FormView form={form} data={data} />,
    );
    const textElement = (await findByLabelText("Texts")) as HTMLSelectElement;
    const numberElement = (await findByLabelText(
      "Numbers",
    )) as HTMLSelectElement;
    expect((await findByText("three")).nodeName).toBe("OPTION");
    fireEvent.change(textElement, { target: { value: "one" } });
    await waitFor(() => {
      expect(data.texts).toBe("one");
    });
    fireEvent.change(numberElement, { target: { value: "1" } });
    await waitFor(() => {
      expect(data.numbers).toBe(1);
    });
  });

  test("Custom not selected label", () => {
    const { queryByText } = renderWithProvider(<FormView form={form} data={data} />);
    expect(queryByText("- Pick one -")).not.toBeNull();
  });

  test("Option groups", async () => {
    const groups = textField({
      label: "Groups",
      widget: selectWidget([
        ["A group", ["test", "test2"]],
        ["Another group", ["test3"]],
      ]),
    });
    const selected = "test";
    const noOp = () => {
      // No-op.
    };
    const { container } = renderWithProvider(
      <FormComponentView
        name="groups"
        theme={basic}
        value={selected}
        onChange={noOp}
        component={groups}
      />,
    );
    const firstGroup = container.querySelector("optgroup[label='A group']");
    const secondGroup = container.querySelector(
      "optgroup[label='Another group']",
    );
    expect(firstGroup).not.toBe(null);
    expect(secondGroup).not.toBe(null);
    if (firstGroup && secondGroup) {
      expect(firstGroup.childElementCount).toBe(2);
      expect(secondGroup.childElementCount).toBe(1);
    }
  });
  inputElementOk(texts, "select widget(text):");
  inputElementOk(texts, "select widget(number):");
});
