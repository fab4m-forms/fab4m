import * as React from "react";
import { render } from "@testing-library/react";
import {
  createForm,
  generateSchema,
  StatefulFormView,
  integerField,
  min,
  max,
} from "../../src";
import { validate } from "../../src/schemaValidator";

describe("Min/maxvalue validator", () => {
  const form = createForm({
    minValue: integerField({
      label: "Min value",
      validators: [min(5)],
    }),
    maxValue: integerField({
      label: "Max value",
      validators: [max(10)],
    }),
  });
  test("min and max schema", () => {
    const schema = generateSchema(form);
    if (schema.properties.minValue?.type === "number") {
      expect(schema.properties.minValue?.minimum).toBe(5);
    }
    if (schema.properties.maxValue?.type === "number") {
      expect(schema.properties.maxValue?.maximum).toBe(10);
    }
  });

  test("Schema validation", () => {
    const validData = {
      minValue: 6,
      maxValue: 10,
    };
    const invalidData = {
      minValue: 4,
      maxValue: 11,
    };
    const validResult = validate(form, validData);
    const invalidResult = validate(form, invalidData);
    expect(validResult.valid).toBe(true);
    expect(invalidResult.valid).toBe(false);
  });

  test("Form validation", async () => {
    const { findByLabelText } = render(<StatefulFormView form={form} />);
    const minInput = await findByLabelText("Min value");
    const maxInput = await findByLabelText("Max value");
    expect((minInput as HTMLInputElement).min).toBe("5");
    expect((maxInput as HTMLInputElement).max).toBe("10");
  });
});
