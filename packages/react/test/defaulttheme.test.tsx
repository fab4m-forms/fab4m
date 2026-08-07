import * as React from "react";
import { waitFor } from "@testing-library/react";
import { FormView } from "../src/index";
import { textField, tailwind, setDefaultTheme, createForm } from "@fab4m/fab4m";
import { renderWithProvider } from "./util";

describe("Default theme", () => {
  setDefaultTheme(tailwind);
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
      expect(text.className).toContain("border-slate-300");
    });
  });
});
