import { SchemaProperty } from "../schema";
import { Validator, ValidatorType, validator } from "../validator";
export type EqualsValues = string | number | boolean;

export interface EqualsSettings {
  value: EqualsValues;
  message: string;
}

/**
 * Length validator type.
 * @group Validators
 */
type EqualsType = ValidatorType<EqualsValues, EqualsSettings, SchemaProperty>;

/**
 * This validator let's you ensure that one value is exactly equal to another value.
 * @group Validators
 */
export const equalsValidator: EqualsType = {
  name: "equals",
  components: ["text", "integer", "float", "boolean", "email", "url"],
  title: "Equals",
  defaultSettings: { value: 0, message: "The value must be equal to %compare" },
  schema: (settings) => ({
    const: settings.value,
  }),
  validate: async (value, settings) => {
    if (value !== settings.value) {
      return [
        {
          path: "",
          message: settings.message.replace(
            "%compare",
            settings.value.toString(),
          ),
        },
      ];
    }
    return [];
  },
  valid: (value, settings) => value === settings.value,
};

/**
 * This validator let's you ensure that one value is exactly equal to another value.
 * @group Validators
 */
export function equals(
  value: EqualsValues,
  message?: string,
): Validator<EqualsType, EqualsSettings> {
  return validator({
    type: equalsValidator,
    settings: {
      value: value,
      message: message ?? equalsValidator.defaultSettings.message,
    },
  });
}
