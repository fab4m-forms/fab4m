import { SchemaProperty } from "../schema";
import {
  Validator,
  ValidatorType,
  validator,
  ValidationError,
} from "../validator";

type Callback<ValueType> = (value: ValueType) => ValidationError[] | boolean;
/**
 * Callback validator type.
 * @group Validators
 */
type CallbackType<ValueType> = ValidatorType<
  ValueType,
  Callback<ValueType>,
  SchemaProperty
>;

function createCallbackValidator<ValueType>(): CallbackType<ValueType> {
  return {
    name: "exists",
    title: "Exists",
    schema: () => ({}),
    attributes: () => ({}),
    defaultSettings: () => [],
    validate: async (value, callback) => {
      const result = callback(value);
      return Array.isArray(result)
        ? result
        : [{ path: "", message: "invalid" }];
    },
    valid: (value, callback) => {
      const result = callback(value);
      return Array.isArray(result) ? result.length === 0 : result;
    },
  };
}

/**
 * This validator executes a callback that verifies that the
 * data is correct.
 * **Note:** This validator does not work with JSON schema!
 * @group Validators
 */
export function callback<ValueType = unknown>(
  callback: Callback<ValueType>
): Validator<CallbackType<ValueType>, ValueType> {
  return validator<CallbackType<ValueType>, ValueType>({
    type: createCallbackValidator<ValueType>(),
    settings: callback as any,
  });
}
