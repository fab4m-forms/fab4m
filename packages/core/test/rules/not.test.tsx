import * as React from "react";
import { render } from "@testing-library/react";
import { textField, createForm, equals, not, FormView, Form } from "../../src";
import { validate } from "../../src/schemaValidator";
describe("Not rule", () => {
  const form = createForm();
  form.add(textField({ name: "first", label: "First" }));
  form.add(
    textField({
      name: "second",
      required: true,
      label: "Second",
      rules: [not([["first", equals("first")]])],
    })
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
      let screen = render(<FormView data={data} form={form} />);
      expect(screen.queryByText("Second")).not.toBeNull();
      data.first = "first";
      screen.unmount();
      screen = render(<FormView data={data} form={form} />);
      expect(screen.queryByText("Second")).toBeNull();
    };
  };
  test("Not Equals rule", testNotRule(form));

  test("Schema validation", () => {
    expect(validate(form, { first: "first" }).valid).toBe(true);
    expect(validate(form, { first: "test" }).valid).toBe(false);
  });
});
