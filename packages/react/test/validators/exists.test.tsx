import * as React from "react";

import {
  textField,
  createForm,
  FormView,
  exists,
  StatefulFormView,
} from "../../src";
import { renderWithProvider } from "../util";


describe("Exists", () => {
  const form = createForm();
  form.add(textField({ name: "first", label: "First" }));
  form.add(
    textField({
      name: "second",
      label: "Second",
      rules: [["first", exists()]],
    }),
  );
  const third = textField({
    name: "third",
    label: "Third",
    validators: [exists()],
  });

  form.add(third);
  test("Exists rule", async () => {
    const data: Record<string, unknown> = {
      first: undefined,
      second: "",
    };
    form.onSubmit((e) => {
      e.preventDefault();
    });
    let screen = renderWithProvider(<FormView data={data} form={form} />);
    expect(screen.queryByText("Second")).toBeNull();
    data.first = "first";
    screen.unmount();
    screen = renderWithProvider(<FormView data={data} form={form} />);
    expect(screen.queryByText("Second")).not.toBeNull();
  });
  test("Form validator", async () => {
    const { findByLabelText } = renderWithProvider(<StatefulFormView form={form} />);
    expect(
      ((await findByLabelText("Third")) as HTMLInputElement).required,
    ).toBe(true);
  });
});
