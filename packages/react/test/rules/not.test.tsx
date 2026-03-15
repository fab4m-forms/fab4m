import * as React from "react";

import { FormView } from "../../src/index";
import { textField, createForm, equals, not, Form } from "@fab4m/fab4m";
import { renderWithProvider } from "../util";

describe("Not rule", () => {
  const form = createForm();
  form.add(textField({ name: "first", label: "First" }));
  form.add(
    textField({
      name: "second",
      required: true,
      label: "Second",
      rules: [not([["first", equals("first")]])],
    }),
  );
  const testNotRule = (form: Form) => {
    return async () => {
      const data = {
        first: "",
        second: "",
      };
      form.onSubmit((e) => {
        e.preventDefault();
      });
      let screen = renderWithProvider(<FormView data={data} form={form} />);
      expect(screen.queryByText("Second")).not.toBeNull();
      data.first = "first";
      screen.unmount();
      screen = renderWithProvider(<FormView data={data} form={form} />);
      expect(screen.queryByText("Second")).toBeNull();
    };
  };
  test("Not Equals rule", testNotRule(form));

});
