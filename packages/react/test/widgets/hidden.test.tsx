import * as React from "react";
import { basic, textField, hiddenFieldWidget } from "@fab4m/fab4m";
import { FormComponentView } from "../../src/components/FormComponentView";
import { renderWithProvider } from "../util";

describe("Hidden field", () => {
  const field = textField({
    name: "text_options",
    label: "Text options",
    required: true,
    widget: hiddenFieldWidget(),
  });
  test("Hidden field", async () => {
    const data = "test data";
    const component = () => (
      <FormComponentView
        name="hidden"
        theme={basic}
        onChange={() => {
          /* No-op */
        }}
        component={field}
        value={data}
      />
    );
    const { getByTestId } = renderWithProvider(component());
    expect(getByTestId("hidden-hidden")).toHaveValue("test data");
  });
});
