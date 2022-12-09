import { SchemaProperty } from "../schema";
import { Validator, ValidatorType, validator } from "../validator";

/**
 * Exists validator type.
 * @group Validators
 */
type ExistsType = ValidatorType<unknown, null, SchemaProperty>;

/**
 * This validator let's you ensure that a value exists.
 * @group Validators
 */
export const existsValidator: ExistsType = {
  name: "exists",
  title: "Exists",
  defaultSettings: null,
  schema: (settings, schema) => {
    if (schema.type === "string") {
      return { minLength: 1, type: "string" };
    }
    return {};
  },
  attributes: () => ({
    required: true,
  }),
  forceRequired: true,
  valid: (value, settings) => !!value,
};

/**
 * This validator let's you ensure that one value is exactly equal to another value.
 * @group Validators
 */
export function exists(): Validator<ExistsType, null> {
  return validator({
    type: existsValidator,
    settings: null,
  });
}
