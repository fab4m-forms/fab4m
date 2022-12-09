import { SchemaProperty } from "../schema";
import { ValidatorType } from "../validator";
/**
 * Settings type for the values validators.
 * @group Validators
 */
export interface ValuesSettings {
  values: Array<string | number>;
  message: string;
}

/**
 * Allowed types for the values validators.
 * @group Validators
 */
type ValuesType = ValidatorType<
  string | number,
  ValuesSettings,
  SchemaProperty
>;

/**
 * The allowed values validator let's you ensure that a component has
 * one of the specified values.
 * @group Validators
 */
export const allowedValuesValidator: ValuesType = {
  name: "allowedValues",
  components: ["text"],
  title: "Allowed values",
  defaultSettings: { values: [], message: "The value is not allowed" },
  schema: (settings) => ({
    enum: settings.values,
  }),
  schemaErrorMessages: (settings) => ({
    enum: () => settings.message,
  }),
  validate: async (value, settings) => {
    if (settings.values.indexOf(value) === -1) {
      return [
        {
          path: "",
          message: settings.message,
        },
      ];
    }
    return [];
  },
  valid: (value, settings) => {
    return settings.values.indexOf(value) !== -1;
  },
};

/**
 * The disallowed values validator let's you ensure that a component doesn't have
 * one of the specified values.
 * @group Validators
 */
export const disallowedValuesValidator: ValuesType = {
  name: "disallowedValues",
  components: ["text"],
  title: "Disallowed values",
  defaultSettings: { values: [], message: "The value is not allowed" },
  schema: (settings) => ({
    not: {
      enum: settings.values,
    },
  }),
  schemaErrorMessages: (settings) => ({
    not: () => settings.message,
  }),
  validate: async (value, settings) => {
    if (settings.values.indexOf(value) !== -1) {
      return [
        {
          path: "",
          message: settings.message,
        },
      ];
    }
    return [];
  },
  valid: (value, settings) => {
    return settings.values.indexOf(value) === -1;
  },
};

interface ValuesValidator {
  type: ValuesType;
  settings: { values: Array<string | number>; message: string };
}

/**
 * The allowed values validator let's you ensure that a component has
 * one of the specified values.
 * @group Validators
 */
export function allowedValues(
  values: Array<string | number> = [],
  message = "The value is not allowed"
): ValuesValidator {
  return {
    type: allowedValuesValidator,
    settings: { values, message },
  };
}

/**
 * The disallowed values validator let's you ensure that a component doesn't have
 * one of the specified values.
 * @group Validators
 */
export function disallowedValues(
  values: Array<string | number> = [],
  message = "The value is not allowed"
): ValuesValidator {
  return {
    type: disallowedValuesValidator,
    settings: { values, message },
  };
}
