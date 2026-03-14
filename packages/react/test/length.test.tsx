import * as React from "react";

import { StatefulFormView } from "../src";
import {
  createForm,
  maxLength,
  minLength,
  textAreaWidget,
  textField,
  textFieldWidget,
} from "@fab4m/fab4m";
import { renderWithProvider } from "./util";


describe("Length validator", () => {
  // Set up our form builder and add validators to a textfield.
  const form = createForm();
  const minValidator = minLength();
  const maxValidator = maxLength();
  form.add(
    textField({
      name: "text",
      label: "A text field",
      required: true,
      widget: textFieldWidget(),
      validators: [minValidator, maxValidator],
    }),
  );
  form.add(
    textField({
      name: "textarea",
      label: "A textarea field",
      required: true,
      widget: textAreaWidget(),
      validators: [minValidator, maxValidator],
    }),
  );

  minValidator.settings = 5;
  maxValidator.settings = 10;

  // Rendering the form with the validators should render an input with min 5
  // and max 10.
  test("Form render", async () => {
    const { findByLabelText } = renderWithProvider(<StatefulFormView form={form} />);
    const textField = await findByLabelText("A text field");
    const textArea = await findByLabelText("A textarea field");
    expect(textField.getAttribute("minlength")).toBe("5");
    expect(textField.getAttribute("maxlength")).toBe("10");
    expect(textArea.getAttribute("minlength")).toBe("5");
    expect(textArea.getAttribute("maxlength")).toBe("10");
  });
});
