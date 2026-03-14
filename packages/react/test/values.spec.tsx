import * as React from "react";
import { fireEvent, waitFor } from "@testing-library/react";
import { StatefulFormView } from "../src";
import {
  allowedValues,
  createForm,
  disallowedValues,
  textField,
} from "@fab4m/fab4m";
import { renderWithProvider } from "./util";


describe("Allowed/Disallowed values validator", () => {
  const form = createForm();
  form.add(
    textField({
      name: "disallowedText",
      label: "A text field",
      required: true,
      validators: [
        disallowedValues(["text", "text2"], "Custom disallowed message"),
      ],
    }),
  );
  form.add(
    textField({
      name: "allowedText",
      label: "Another text field",
      required: true,
      validators: [allowedValues(["text", "text2"], "Custom allowed message")],
    }),
  );

  test("Form validation", async () => {
    const context = renderWithProvider(<StatefulFormView form={form} />);
    const disallowedInput = context.container.querySelector(
      "#disallowedText",
    ) as HTMLInputElement;
    const allowedInput = context.container.querySelector(
      "#allowedText",
    ) as HTMLInputElement;
    const formElement = context.container.querySelector("form");
    if (allowedInput && disallowedInput && formElement) {
      fireEvent.input(allowedInput, {
        value: "text3",
        target: { value: "text3" },
      });
      fireEvent.input(disallowedInput, {
        value: "text",
        target: { value: "text" },
      });
      await waitFor(() => {
        expect(allowedInput.value).toBe("text3");
        expect(disallowedInput.value).toBe("text");
      });
      fireEvent.submit(formElement);
      expect(
        await context.findByText("Custom disallowed message"),
      ).toBeVisible();
      expect(await context.findByText("Custom allowed message")).toBeVisible();
    }
  });
});
