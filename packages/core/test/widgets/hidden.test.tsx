import * as React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { basic, textField, hiddenFieldWidget } from "../../src";
import FormComponentView from "../../src/components/FormComponentView";

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
    const { getByTestId } = render(component());
    expect(getByTestId("hidden-hidden")).toHaveValue("test data");
  });
});
