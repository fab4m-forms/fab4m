import * as React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import {
  textField,
  createForm,
  equals,
  FormView,
  generateComponentSchema,
  StatefulFormView,
} from "../../src";
import { validate } from "../../src/schemaValidator";
import { getFormElement } from "../util";

describe("Equals", () => {
  const form = createForm();

  form.add(textField({ name: "first", label: "First" }));
  form.add(
    textField({
      name: "second",
      label: "Second",
      required: true,
      rules: [["first", equals("first")]],
    }),
  );
  const third = textField({
    name: "third",
    label: "Third",
    validators: [equals("third", "Custom message with %compare")],
  });

  form.add(third);
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
    data.first = "first";
    screen.unmount();
    screen = render(<FormView data={data} form={form} />);
    expect(screen.queryByText("Second")).not.toBeNull();
  });

  test("Form validator", async () => {
    const { findByLabelText, queryByText, container } = render(
      <StatefulFormView form={form} />,
    );
    const formElement = getFormElement(container);
    fireEvent.input(await findByLabelText("Third"), {
      target: { value: "nope" },
    });
    fireEvent.submit(formElement);
    await waitFor(() => {
      expect(queryByText("Custom message with third")).not.toBeNull();
    });
  });
  test("Equals JSON schema", () => {
    const schema = generateComponentSchema(third);
    if (schema && schema.type === "string") {
      expect(schema.const).toBe("third");
    }
  });
  test("Equals JSON schema validation", () => {
    const invalidData = { third: "nope" };
    const validData = { third: "third" };
    const conditionallyInvalidData = { first: "first", third: "third" };
    const validResult = validate(form, validData);
    const invalidResult = validate(form, invalidData);
    const conditionallyInvalidResult = validate(form, conditionallyInvalidData);
    expect(validResult.valid).toBe(true);
    expect(invalidResult.valid).toBe(false);
    expect(conditionallyInvalidResult.valid).toBe(false);
  });
});
