import * as React from "react";
import { waitFor } from "@testing-library/react";
import { FormView } from "../src";
import { textField, bulma, setDefaultTheme, createForm } from "@fab4m/fab4m";
import { renderWithProvider } from "./util";


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
    const { findByLabelText } = renderWithProvider(
      <FormView form={form} data={{ text: "" }} />,
    );
    const text = (await findByLabelText("Text field")) as HTMLInputElement;
    await waitFor(() => {
      expect(text.className).toBe("input");
    });
  });
});
