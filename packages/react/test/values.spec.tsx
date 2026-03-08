import * as React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import {
  allowedValues,
  createForm,
  disallowedValues,
  generateSchema,
  StatefulFormView,
  textField,
} from "../src";
import { validate } from "../src/schemaValidator";

describe("Allowed/Disallowed values validator", () => {
  const form = createForm();
  form.add(
    textField({
      name: "disallowedText",
      label: "A text field",
      required: true,
      validators: [
        disallowedValues(["text", "text2"], "Custom disallowed message"),
      ],
    }),
  );
  form.add(
    textField({
      name: "allowedText",
      label: "Another text field",
      required: true,
      validators: [allowedValues(["text", "text2"], "Custom allowed message")],
    }),
  );

  test("disallowed Field schema", () => {
    const schema = generateSchema(form);
    if (schema.properties.disallowedText.type === "string") {
      expect(schema.properties.disallowedText.not?.enum).toEqual(
        expect.arrayContaining(["text", "text2"]),
      );
    }
  });

  test("allowed Field schema", () => {
    const schema = generateSchema(form);
    if (schema.properties.allowedText.type === "string") {
      expect(schema.properties.allowedText.enum).toEqual(
        expect.arrayContaining(["text", "text2"]),
      );
    }
  });

  test("Schema validation", () => {
    const validData = {
      allowedText: "text",
      disallowedText: "notText",
    };
    const invalidData = {
      allowedText: "notText",
      disallowedText: "text",
    };
    const validResult = validate(form, validData);
    const invalidResult = validate(form, invalidData);
    expect(validResult.valid).toBe(true);
    expect(invalidResult.valid).toBe(false);
    expect(invalidResult.errors["/disallowedText"]).toBe(
      "Custom disallowed message",
    );
    expect(invalidResult.errors["/allowedText"]).toBe("Custom allowed message");
  });

  test("Form validation", async () => {
    const context = render(<StatefulFormView form={form} />);
    const disallowedInput = context.container.querySelector(
      "#disallowedText",
    ) as HTMLInputElement;
    const allowedInput = context.container.querySelector(
      "#allowedText",
    ) as HTMLInputElement;
    const formElement = context.container.querySelector("form");
    if (allowedInput && disallowedInput && formElement) {
      fireEvent.input(allowedInput, {
        value: "text3",
        target: { value: "text3" },
      });
      fireEvent.input(disallowedInput, {
        value: "text",
        target: { value: "text" },
      });
      await waitFor(() => {
        expect(allowedInput.value).toBe("text3");
        expect(disallowedInput.value).toBe("text");
      });
      fireEvent.submit(formElement);
      expect(
        await context.findByText("Custom disallowed message"),
      ).toBeVisible();
      expect(await context.findByText("Custom allowed message")).toBeVisible();
    }
  });
});
