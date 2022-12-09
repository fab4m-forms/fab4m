import { ValidatorType } from "../validator";

interface NumberValidator {
  type: ValidatorType<number, number>;
  settings: number;
}

/**
 * The min validator type ensures that a number is equal or greater than
 * the provided value.
 * @group Validators
 */
export const minValidator: ValidatorType<number, number> = {
  name: "min",
  components: ["integer", "float"],
  defaultSettings: 0,
  title: "Min value",
  schema: (minimum) => ({ minimum }),
  attributes: (validator) => ({
    min: validator.settings,
  }),
  valid: (value, settings) => value > settings,
};

/**
 * The max validator type ensures that a number is equal or less than
 * the provided value.
 * @group Validators
 */
export const maxValidator: ValidatorType<number, number> = {
  name: "max",
  components: ["integer", "float"],
  defaultSettings: 0,
  title: "Max value",
  schema: (maximum) => ({ maximum }),
  attributes: (validator) => ({
    max: validator.settings,
  }),
  valid: (value, settings) => value < settings,
};

/**
 * The min validator ensures that a number is equal or greater than
 * the provided value.
 * @group Validators
 */
export function min(minNumber: number): NumberValidator {
  return {
    type: minValidator,
    settings: minNumber,
  };
}

/**
 * The max validator ensures that a number is equal or less than
 * the provided value.
 * @group Validators
 */
export function max(maxNumber: number): NumberValidator {
  return {
    type: maxValidator,
    settings: maxNumber,
  };
}
