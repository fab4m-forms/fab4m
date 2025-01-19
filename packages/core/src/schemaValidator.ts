import Ajv from "ajv";
import { FormDefinition } from "./form";
import { generateSchema, errorMessages } from "./schema";
import addFormats from "ajv-formats";

export interface ValidationStatus {
  valid: boolean;
  errors: Record<string, string>;
}

export function validate(
  form: FormDefinition,
  data: Record<string, unknown>,
): ValidationStatus {
  const schema = generateSchema(form, data);
  const ajv = new Ajv({ $data: true, allErrors: true });
  addFormats(ajv as any);  
  const validate = ajv.compile(schema);
  const status = validate(data);
  if (status) {
    return {
      valid: true,
      errors: {},
    };
  }

  return {
    valid: false,
    errors: validate.errors
      ? errorMessages(
          form,
          validate.errors.map((e) => ({ ...e, dataPath: e.instancePath })),
        )
      : {},
  };
}
