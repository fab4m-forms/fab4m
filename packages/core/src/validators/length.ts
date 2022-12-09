import { SchemaProperty } from "../schema";
import { Validator, ValidatorType, validator } from "../validator";
/**
 * Length validator type.
 * @group Validators
 */
type LengthType = ValidatorType<string, number, SchemaProperty>;

/**
 * The min length validator let's you ensure
 * that a text has the minimal provided length.
 * @group Validators
 */
export const minLengthValidator: LengthType = {
  name: "minLength",
  components: ["text"],
  title: "Minimal length",
  attributes: (instance) => ({
    minLength: instance.settings.toString(),
  }),
  defaultSettings: 0,
  schema: (value) => ({
    minLength: value,
  }),
  valid: (value, settings) => value?.length > settings,
};

/**
 * The max length validator let's you ensure
 * that a text has the maximal provided length.
 * @group Validators
 */
export const maxLengthValidator: LengthType = {
  name: "maxLength",
  components: ["text"],
  title: "Maxmimal length",
  attributes: (instance) => ({
    maxLength: instance.settings.toString(),
  }),
  defaultSettings: 0,
  schema: (value) => ({
    maxLength: value,
  }),
  valid: (value, settings) => value?.length < settings,
};

/**
 * The min length validator let's you ensure
 * that a text has the minimal provided length.
 * @group Validators
 */
export function maxLength(length?: number): Validator<LengthType, number> {
  return validator<LengthType, number>({
    type: maxLengthValidator,
    settings: length ?? maxLengthValidator.defaultSettings,
  });
}

/**
 * The min length validator let's you ensure
 * that a text has the minimal provided length.
 * @group Validators
 */
export function minLength(length?: number): Validator<LengthType, number> {
  return validator<LengthType, number>({
    type: minLengthValidator,
    settings: length ?? minLengthValidator.defaultSettings,
  });
}
