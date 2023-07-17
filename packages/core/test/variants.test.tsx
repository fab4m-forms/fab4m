import * as React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { validate } from "../src/schemaValidator";
import {
  createForm,
  textField,
  textFieldWidget,
  StatefulFormView,
  equals,
  generateSchema,
} from "../src";

describe("Variants API", () => {
  const form = createForm({
    text: textField({
      label: "Text",
      required: true,
      widget: textFieldWidget(),
      validators: [],
    }),
    dependent: [
      [
        "text",
        equals("test"),
        textField({
          label: "Dependent text field",
          required: true,
        }),
      ],
      [
        "text",
        equals("test2"),
        textField({
          label: "Not required text field",
          required: false,
        }),
      ],
    ],
    dependent2: [
      [
        "dependent",
        equals("test"),
        textField({
          label: "Dependent on other field",
          required: false,
        }),
      ],
      [
        "dependent",
        equals("test2"),
        textField({
          label: "Dependent on other field",
          required: true,
        }),
      ],
      textField({
        label: "Default dependent",
        required: false,
      }),
    ],
  });
  test("Dependent rendering", async () => {
    const { findByLabelText, queryByLabelText } = render(
      <StatefulFormView form={form} />
    );
    const text = await findByLabelText("Text");
    fireEvent.input(text, { target: { value: "test" } });
    await waitFor(() => {
      const dependent = queryByLabelText("Dependent text field");
      expect(dependent).toBeVisible();
      expect(dependent).toHaveAttribute("required");
    });
    fireEvent.input(text, { target: { value: "test2" } });
    await waitFor(() => {
      const dependent = queryByLabelText("Not required text field");
      expect(dependent).toBeVisible();
      expect(dependent).not.toHaveAttribute("required");
    });
    fireEvent.input(await findByLabelText("Not required text field"), {
      target: { value: "test" },
    });
    await waitFor(() => {
      expect(queryByLabelText("Dependent on other field")).toBeVisible();
    });
  });

  test("Default component rendered when no other matches", async () => {
    const { findByText } = render(<StatefulFormView form={form} />);
    expect(await findByText("Default dependent")).toBeVisible();
  });
  test("Variants schema", async () => {
    expect(validate(form, { text: "test" }).valid).toBe(false);
    expect(validate(form, { text: "test", dependent: "asdf" }).valid).toBe(
      true
    );
    expect(validate(form, { text: "test2", dependent: 2 }).valid).toBe(false);
    expect(validate(form, { text: "test2", dependent: "asdf" }).valid).toBe(
      true
    );
  });

  test("Nested variants", async () => {
    expect(validate(form, { text: "test", dependent: "test2" }).valid).toBe(
      false
    );
  });
});
