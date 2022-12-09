import * as React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { basic, booleanField, checkboxWidget } from "../../src";
import { inputElementOk } from "../util";
import FormComponentView from "../../src/components/FormComponentView";

describe("Boolean field", () => {
  const field = booleanField({
    name: "choice",
    label: "A choice",
    required: true,
    widget: checkboxWidget(),
    validators: [],
  });
  test("Boolean choice", async () => {
    let data = false;
    const changeData = (value: unknown) => {
      data = value as boolean;
    };
    const component = () => (
      <FormComponentView
        name="choice"
        theme={basic}
        onChange={changeData}
        component={field}
        value={data}
      />
    );
    const { container, rerender } = render(component());
    const element = container.querySelector("input");
    if (element) {
      expect(element.checked).toBe(false);
      expect(container.querySelector("span")?.innerHTML).toContain(field.label);
      fireEvent.click(element);
      await waitFor(() => {
        expect(data).toBe(true);
        rerender(component());
        expect(element.checked).toBe(true);
      });
    }
  });
  inputElementOk(field, "boolean:");
});
