import { Validator, ValidatorType } from "fab4m";
import PasswordValidatorInfo from "./PasswordValidatorInfo";
import { PasswordVerifyData, PasswordValidateOldData } from ".";
/**
 * Validation settings for the Validator.
 * @group Validators
 */
export interface ValidationSettings {
  minLength: number;
  requiredLetter: boolean;
  requiredNumber: boolean;
  requiredSpecialChar: boolean;
}

/**
 * Generate a password regular expression based on the settings.
 * @internal
 */
export const passwordRegex = (settings: ValidationSettings): string => {
  let required = "";
  if (settings.requiredLetter) {
    required += "(?=.*[A-Za-z])";
  }
  if (settings.requiredNumber) {
    required += `(?=.*\\d)`;
  }
  if (settings.requiredSpecialChar) {
    required += "(?=.*[@$!%*#?&])";
  }
  return `^${required}.{${settings.minLength},}$`;
};

/**
 * The password validator type.
 * @group Validators
 */
export type PasswordValidatorType = ValidatorType<
  PasswordVerifyData | string,
  ValidationSettings,
  { password: { pattern: string } } | { pattern: string }
>;

/**
 * The password validator validates that the password follows the
 * specified settings:
 * - At least one required letter.
 * - At least one required number.
 * - At least one required special character.
 * - Minimal length.
 * @group Validators
 */
export const validPasswordValidator: PasswordValidatorType = {
  name: "password",
  title: "Password",
  schema: (settings, schema) => {
    const regex = passwordRegex(settings);
    return schema.type === "string"
      ? { pattern: regex }
      : {
          password: {
            type: "string",
            pattern: regex,
          },
        };
  },
  validatorInfo: PasswordValidatorInfo,
  attributes: (validator) => {
    return {
      pattern: passwordRegex(validator.settings),
    };
  },
  valid: (value, settings) =>
    new RegExp(passwordRegex(settings)).test(
      typeof value === "string" ? value : value.password
    ),
  defaultSettings: {
    minLength: 8,
    requiredLetter: true,
    requiredNumber: true,
    requiredSpecialChar: false,
  },
  components: ["password", "passwordVerify", "passwordValidateOld"],
  schemaErrorMessages: () => ({
    "properties/password/pattern": () => "The password isn't strong enough",
  }),
};

/**
 * Settings for the validate old password type.
 * @group Validators
 */
interface ValidateOldSettings {
  validateOldPassword?: (password: string) => Promise<boolean>;
}
/**
 * The validate old type definition.
 * @group Validators
 */
export type PasswordValidateOldType = ValidatorType<
  PasswordValidateOldData,
  ValidateOldSettings,
  unknown
>;

/**
 * The validate old validator validates that the old password provides matches
 * the real old password. The validation is performed through an async callback
 * that should return true if the password is equal and false otherwise.
 *
 * **Note:** The old password validator does not work within the JSON Schema since it needs
 * to perform an external validation. It doesn't work when used inside of rules either.
 * @group Validators
 */
export const validOldPasswordValidator: PasswordValidateOldType = {
  name: "password",
  title: "Password verify",
  schema: () => ({}),
  defaultSettings: {},
  components: ["passwordVerifyOld"],
  validate: async (value, settings) => {
    if (!settings.validateOldPassword) {
      return [];
    }
    const result = await settings.validateOldPassword(value.oldPassword);
    return !result
      ? [
          {
            path: "",
            message: "The old password did not match.",
          },
        ]
      : [];
  },
  // Note: the old password validator doesn't work here.
  valid: () => true,
};

/**
 * The password validator validates that the password follows the
 * specified settings:
 * - At least one required letter.
 * - At least one required number.
 * - At least one required special character.
 * - Minimal length.
 * @group Validators
 */
export function validPassword(
  settings?: ValidationSettings
): Validator<PasswordValidatorType, ValidationSettings> {
  return {
    type: validPasswordValidator,
    settings: settings ?? validPasswordValidator.defaultSettings,
  };
}

/**
 * The validate old validator validates that the old password provides matches
 * the real old password. The validation is performed through an async callback
 * that should return true if the password is equal and false otherwise.
 * @group Validators
 */
export function validOldPassword(
  validate: (password: string) => Promise<boolean>
): Validator<PasswordValidateOldType, ValidateOldSettings> {
  return {
    type: validOldPasswordValidator,
    settings: { validateOldPassword: validate },
  };
}
