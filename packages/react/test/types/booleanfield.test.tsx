import * as React from "react";
import { fireEvent, waitFor } from "@testing-library/react";
import { basic, booleanField, checkboxWidget } from "@fab4m/fab4m";
import { inputElementOk, renderWithProvider } from "../util";
import { FormComponentView } from "../../src/index";
import { FormProvider } from "../../src/index";
import { allWidgetsRenderer } from "../../src/index";

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
    const { container, rerender } = renderWithProvider(component());
    const element = container.querySelector("input");
    if (element) {
      expect(element.checked).toBe(false);
      expect(container.querySelector("span")?.innerHTML).toContain(field.label);
      fireEvent.click(element);
      await waitFor(() => {
        expect(data).toBe(true);
        rerender(
          <FormProvider renderer={allWidgetsRenderer}>{component()}</FormProvider>,
        );
        expect(element.checked).toBe(true);
      });
    }
  });
  inputElementOk(field, "boolean:");
});
