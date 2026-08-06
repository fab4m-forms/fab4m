import Ajv from "ajv";
import addFormats from "ajv-formats";
import {
  checkValidators,
  createForm,
  errorMessages,
  generateSchema,
  FormDefinition,
  passwordField,
  passwordValidateOldField,
  passwordValidateOldWidget,
  passwordVerifyField,
  passwordVerifyWidget,
  validOldPassword,
  validPassword,
} from "../src";

describe("password validators", () => {
  describe("password verify schema", () => {
    const form = createForm();
    form.add(
      passwordVerifyField({
        name: "password",
        label: "Password field",
        required: true,
        widget: passwordVerifyWidget(),
        validators: [
          validPassword({
            requiredLetter: false,
            requiredNumber: false,
            requiredSpecialChar: false,
            minLength: 5,
          }),
        ],
      }),
    );

    test("validates matching passwords", () => {
      const data = {
        password: {
          password: "mypassword",
          confirmPassword: "mypassword",
        },
      };
      const validResult = validate(form, data);
      expect(validResult.valid).toBe(true);
    });

    test("rejects non-matching passwords", () => {
      const data = {
        password: {
          password: "mypassword",
          confirmPassword: "Not password",
        },
      };
      const invalidResult = validate(form, data);
      expect(invalidResult.valid).toBe(false);
      expect(invalidResult.errors["/password/confirmPassword"]).toBe(
        "The passwords don't match",
      );
    });
  });

  describe("old password validator", () => {
    async function validateOld(oldPassword: string) {
      return oldPassword === "password";
    }
    const oldValidator = validOldPassword(validateOld);
    const password = passwordValidateOldField({
      name: "password",
      label: "Password field",
      required: true,
      widget: passwordValidateOldWidget(),
      validators: [oldValidator],
    });

    test("passes when old password matches", async () => {
      const noErrors = await checkValidators(
        "",
        {
          oldPassword: "password",
          password: "otherpassword",
          confimPassword: "otherpassword",
        },
        password,
      );
      expect(noErrors.length).toBe(0);
    });

    test("fails when old password does not match", async () => {
      const errors = await checkValidators(
        "",
        {
          oldPassword: "notOldPassword",
          password: "otherpassword",
          confimPassword: "otherpassword",
        },
        password,
      );
      expect(errors.length).toBe(1);
    });
  });

  describe("password field schema", () => {
    test("password field produces a string schema", () => {
      const form = createForm();
      form.add(
        passwordField({
          name: "simple_password",
          label: "Simple password",
        }),
      );
      const schema = generateSchema(form);
      const passwordSchema = schema.properties.simple_password as {
        type: string;
      };
      expect(passwordSchema.type).toBe("string");
    });
  });
});

function validate(form: FormDefinition, data: unknown) {
  const schema = generateSchema(form);
  const ajv = new Ajv({ $data: true, allErrors: true });
  addFormats(ajv as unknown as never);
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
