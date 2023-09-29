import * as React from "react";
import { render } from "@testing-library/react";
import {
  textField,
  createForm,
  FormView,
  exists,
  StatefulFormView,
  generateComponentSchema,
  generateSchema,
} from "../../src";
import { validate } from "../../src/schemaValidator";

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
    let screen = render(<FormView data={data} form={form} />);
    expect(screen.queryByText("Second")).toBeNull();
    data.first = "first";
    screen.unmount();
    screen = render(<FormView data={data} form={form} />);
    expect(screen.queryByText("Second")).not.toBeNull();
  });
  test("Form validator", async () => {
    const { findByLabelText } = render(<StatefulFormView form={form} />);
    expect(
      ((await findByLabelText("Third")) as HTMLInputElement).required,
    ).toBe(true);
  });
  test("Equals JSON schema", () => {
    const schema = generateComponentSchema(third);
    if (schema.type === "string") {
      expect(schema.minLength).toBe(1);
    }
    const fullSchema = generateSchema(form);
    expect(fullSchema.required).toContain("third");
  });
  test("Equals JSON schema validation", () => {
    const invalidData = { first: "whatever" };
    const validData = { third: "third" };
    const validResult = validate(form, validData);
    const invalidResult = validate(form, invalidData);
    expect(validResult.valid).toBe(true);
    expect(invalidResult.valid).toBe(false);
  });
});
