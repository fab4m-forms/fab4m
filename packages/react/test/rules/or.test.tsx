import * as React from "react";
import { render } from "@testing-library/react";
import { textField, createForm, equals, or, FormView } from "../../src";
import { validate } from "../../src/schemaValidator";

describe("Or", () => {
  const form = createForm();
  form.add(textField({ name: "first", label: "First" }));
  form.add(
    textField({
      name: "second",
      label: "Second",
      required: true,
      rules: [
        or([
          ["first", equals("choice1")],
          ["first", equals("choice2")],
        ]),
      ],
    }),
  );
  test("Equals rule", async () => {
    const data = {
      first: "",
      second: "",
    };
    form.onSubmit((e) => {
      e.preventDefault();
    });
    let screen = render(<FormView data={data} form={form} />);
    expect(screen.queryByText("Second")).toBeNull();
    const checkChoice = (choice: string) => {
      data.first = choice;
      screen.unmount();
      screen = render(<FormView data={data} form={form} />);
      expect(screen.queryByText("Second")).not.toBeNull();
    };
    checkChoice("choice1");
    checkChoice("choice2");
  });
  test("Rule schema validation", () => {
    // One of the rule matches, this should fail.
    expect(validate(form, { first: "choice1" }).valid).toBe(false);
    expect(validate(form, { first: "choice2" }).valid).toBe(false);
    // The rule does not match.
    expect(validate(form, { first: "choice3" }).valid).toBe(true);
    expect(validate(form, { first: "choice2", second: "match" }).valid).toBe(
      true,
    );
  });
});
