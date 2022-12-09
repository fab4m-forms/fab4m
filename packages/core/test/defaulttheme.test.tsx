import * as React from "react";
import { render, waitFor } from "@testing-library/react";
import {
  textField,
  FormView,
  bulma,
  setDefaultTheme,
  createForm,
} from "../src";

describe("Default theme", () => {
  setDefaultTheme(bulma);
  const form = createForm({
    text: textField({
      label: "Text field",
      required: true,
      validators: [],
    }),
  });
  test("Different default theme", async () => {
    const { findByLabelText } = render(
      <FormView form={form} data={{ text: "" }} />
    );
    const text = (await findByLabelText("Text field")) as HTMLInputElement;
    await waitFor(() => {
      expect(text.className).toBe("input");
    });
  });
});
