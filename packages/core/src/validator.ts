import { ComponentType } from "react";
import { FormComponent } from "./component";
import { SchemaProperty } from "./schema";
import { Theme } from "./theme";
/**
 * A validation error that occurred somewhere within the form.
 * @group Validator API
 */
export interface ValidationError {
  /**The JSON path to the part of the data that was invalid.*/
  path: string;
  /**The error message.*/
  message: string;
}

/**
 * The React properties that are used for the validator info react component.
 * @typeParam ValueType The type of value that this validator handles.
 * @typeParam SettingsType The type of settings that this validator uses.
 * @group Validator API
 */
export interface ValidatorInfoProps<ValueType, SettingsType> {
  /** The current component value. */
  value: ValueType;
  /** The settings for the validator. */
  settings: SettingsType;
  /** The form theme */
  theme: Theme;
}

/**
 * Defines a type of validator that can be used in components.
 * @typeParam ValueType The type of value that this validator handles.
 * @typeParam SettingsType The type of settings that this validator uses.
 * @typeParam SchemaType The Schema type that this validator works with.
 * @group Validator API
 */
export interface ValidatorType<
  ValueType = any,
  SettingsType = any,
  SchemaType = any,
> {
  /** The title of the validator */
  title: string;
  /** The type of components that this validator works with.*/
  components?: string[];
  /** The validator name */
  name: string;
  /**
   * A function that should return any attributes that should be added to a form element.
   * Specify any HTML5 validation attributes here.
   * @param validator A validator instance
   * @return an object with all attributes that should be applied to the form element.
   */
  attributes?: (
    validator: Validator<
      ValidatorType<ValueType, SettingsType, SchemaType>,
      SettingsType
    >,
  ) => Record<string, number | string | boolean>;
  /** A React component that can show information to the user about the expected data input.*/
  validatorInfo?: ComponentType<ValidatorInfoProps<ValueType, SettingsType>>;
  /** The default settings that should be applied to the validator. */
  defaultSettings: SettingsType;
  /**
   * A function to perform the validation. This is necessary when HTML validation isn't enough.
   * This function will be called when the user attempts to submit the form.
   * The function is asynchronous.
   * @param value The current value of the component.
   * @param settings The validator settings
   * @return A list of validation errors
   */
  validate?: (
    value: ValueType,
    settings: SettingsType,
  ) => Promise<ValidationError[]>;
  /**
   * A function to determine if this validation passes or not. This is used
   * when evaluating this validator as a rule.
   * @param value The current value to evaluate
   * @param settings The validator settings
   * @return If the validator passes or not.
   */
  valid: (value: ValueType, settings: SettingsType) => boolean;
  /**
   * This function should make any necessary changes to the JSON schema for the component.
   * @param settings The validator settings.
   * @param schema The current schema for the component.
   * @return The alterations you wish to make to the component schema. The alterations will be merged with the default schema provided.
   */
  schema: (
    settings: SettingsType,
    schema: SchemaProperty,
  ) => Partial<SchemaType>;
  /**
   * This function can be used to specify custom error messages which can be used instead of the default
   * JSON schema messages.
   * @param settings The validator settings.
   * @param component The component the validator is attached to.
   * @return On object where the key is thew JSON pointer relative to the component root where the message should be applied and the value is a function that returns the error message.
   */
  schemaErrorMessages?: (
    settings: SettingsType,
    component: FormComponent,
  ) => Record<string, () => string>;
  /**
   * Force this component to be required within the JSON schema If this is set to true.
   */
  forceRequired?: boolean;
}

export interface ValidatorGroup<SettingsType = any> {
  /** The title of the validator group. */
  title: string;
  /** The validator group name */
  name: string;
  /**
   * A function to perform the validation. This is necessary when HTML validation isn't enough.
   * This function will be called when the user attempts to submit the form.
   * The function is asynchronous.
   * @param value The current value of the component.
   * @param settings The validator settings
   * @return A list of validation errors
   */
  validate?: (
    data: Record<string, unknown>,
    validators: Validator<any, unknown>,
    settings: SettingsType,
  ) => Promise<ValidationError[]>;
  /**
   * Determine if the validator group is valid.
   * @param validators a list of validators within the rule.
   * @param data
   */
  valid: (
    validators: Validator<any, unknown>,
    data: Record<string, unknown>,
    settings: SettingsType,
  ) => boolean;
}

/**
 * Definition of a validator that can be added to a component.
 * @typeParam DefinedValidatorType The validator type.
 * @typeParam SettingsType The type of settings used in the validator.
 * @group Validator API
 */
export interface Validator<
  DefinedValidatorType extends ValidatorType = ValidatorType,
  SettingsType = any,
> {
  type: DefinedValidatorType;
  settings: SettingsType;
}

/**
 * Create a new validator based on a validator type.
 * @param definition The validator definition.
 * @return A validator that can be used on a form component.
 * @group Validator API
 */
export function validator<
  DefinedValidatorType extends ValidatorType,
  SettingsType,
>(
  definition: Validator<DefinedValidatorType, SettingsType>,
): Validator<DefinedValidatorType, SettingsType> {
  return { ...definition };
}

/**
 * Run the validation checks for all validators on a component.
 * @param path A JSON pointer to a path.
 * @param data The data to validate
 * @param component The Form component to run the validators for.
 * @return A list of validation errors
 * @group Validator API
 */
export async function checkValidators(
  path: string,
  data: unknown,
  component: FormComponent,
): Promise<ValidationError[]> {
  const errors: ValidationError[] = [];
  for (const validator of component.validators) {
    if (validator.type.validate) {
      const validatorErrors = await validator.type.validate(
        data,
        validator.settings,
      );
      for (const error of validatorErrors) {
        errors.push({ path: `${path}${error.path}`, message: error.message });
      }
    }
  }
  return errors;
}
