import * as React from "react";
import addFormats from "ajv-formats";

import { render, fireEvent, waitFor } from "@testing-library/react";
import {
  validPassword,
  validOldPassword,
  passwordVerifyField,
  passwordVerifyWidget,
  PasswordVerifyData,
  passwordValidateOldField,
  passwordValidateOldWidget,
  PasswordValidateOldData,
  passwordField,
} from "../src";
import {
  createForm,
  FormComponentView,
  checkValidators,
  StatefulFormView,
  basic,
  FormDefinition,
  generateSchema,
  errorMessages,
} from "@fab4m/fab4m";
import { inputElementOk } from "./util";
import Ajv from "ajv";

describe("Password field", () => {
  function noOp() {
    // No-op on change.
  }
  // Set up our form builder and add validators to a textfield.
  const form = createForm();
  const validator = validPassword({
    requiredLetter: false,
    requiredNumber: false,
    requiredSpecialChar: false,
    minLength: 5,
  });

  form.add(
    passwordField({
      name: "simple_password",
      label: "Simple password",
      validators: [validator],
    }),
  );

  const password = passwordVerifyField({
    name: "password",
    label: "Password field",
    required: true,
    widget: passwordVerifyWidget(),
    validators: [validator],
  });

  form.add(password);

  test("Password form", async () => {
    const { findByLabelText } = render(<StatefulFormView form={form} />);
    const simple = (await findByLabelText(
      "Simple password",
    )) as HTMLInputElement;
    expect(simple.type).toBe("password");
  });
  test("Password verify schema", async () => {
    const data = {
      password: {
        password: "mypassword",
        confirmPassword: "mypassword",
      },
    };
    const validResult = validate(form, data);
    expect(validResult.valid).toBe(true);
    data.password.confirmPassword = "Not password";
    const invalidResult = validate(form, data);
    expect(invalidResult.valid).toBe(false);
    expect(invalidResult.errors["/password/confirmPassword"]).toBe(
      "The passwords don't match",
    );
  });

  test("Password validator attributes", async () => {
    const data = {
      password: {
        password: "mypassword",
        confirmPassword: "mypassword",
      },
    };
    const checkValid = async (value: string, valid: boolean) => {
      const passwordValue: PasswordVerifyData = {
        password: value,
        confirmPassword: "",
      };

      const context = render(
        <FormComponentView
          name="password"
          onChange={noOp}
          theme={basic}
          value={passwordValue}
          component={password}
        />,
      );
      const passwordEl = context.container.querySelector(
        "#password",
      ) as HTMLInputElement;
      expect(passwordEl.checkValidity()).toBe(valid);
      data.password.password = value;
      data.password.confirmPassword = value;
      const status = validate(form, data);
      expect(status.valid).toBe(valid);
      if (!status.valid) {
        expect(status.errors["/password/password"]).toBe(
          "The password isn't strong enough",
        );
      }
    };

    await checkValid("testpassword", true);
    await checkValid("test", false);
    validator.settings.minLength = 1;
    validator.settings.requiredLetter = true;
    await checkValid("1", false);
    await checkValid("t", true);
    validator.settings.requiredLetter = false;
    validator.settings.requiredNumber = true;
    await checkValid("1", true);
    await checkValid("t", false);
    validator.settings.requiredLetter = true;
    validator.settings.requiredNumber = true;
    await checkValid("1", false);
    await checkValid("t", false);
    await checkValid("1t", true);
    validator.settings.requiredLetter = false;
    validator.settings.requiredNumber = false;
    validator.settings.requiredSpecialChar = true;
    await checkValid("1", false);
    await checkValid("t", false);
    await checkValid("%", true);
    await checkValid("1t%", true);
    validator.settings.requiredNumber = true;
    await checkValid("1", false);
    await checkValid("t", false);
    await checkValid("%", false);
    await checkValid("1%", true);
    await checkValid("1t%", true);
    validator.settings.requiredLetter = true;
    await checkValid("1", false);
    await checkValid("t", false);
    await checkValid("%", false);
    await checkValid("1%", false);
    await checkValid("1t%", true);
    validator.settings.minLength = 8;
    await checkValid("1t%", false);
    await checkValid("1t%asdfasdf", true);
  });

  test("Password validator info", () => {
    validator.settings.requiredLetter = false;
    validator.settings.requiredNumber = true;
    validator.settings.minLength = 5;
    const context = render(
      <FormComponentView
        name="password"
        value={{ password: "", confirmPassword: "" }}
        theme={basic}
        component={password}
        onChange={noOp}
      />,
    );
    expect(context.container.innerHTML).toContain(
      "The password needs to include at least one number",
    );
    expect(context.container.innerHTML).toContain(
      "The password needs to contain at least 5 characters",
    );
    expect(context.container.innerHTML).not.toContain(
      "The password needs to include at least one letter",
    );
  });

  test("Password field render", async () => {
    let value = { password: "password", confirmPassword: "" };
    const changePassword = (newValue: unknown) => {
      value = newValue as PasswordVerifyData;
    };
    const component = () => (
      <FormComponentView
        name="password"
        value={value}
        theme={basic}
        component={password}
        onChange={changePassword}
      />
    );
    const context = render(component());
    const passwordEl = context.container.querySelector(
      "#password",
    ) as HTMLInputElement;
    const confirmPasswordEl = context.container.querySelector(
      "#password-confirmPassword",
    ) as HTMLInputElement;
    expect(passwordEl.value).toBe("password");
    expect(confirmPasswordEl.value).toBe("");
    if (passwordEl) {
      fireEvent.input(passwordEl, {
        value: "password2",
        target: { value: "password2" },
      });
      await waitFor(() => {
        expect(value.password).toBe("password2");
      });
      fireEvent.input(confirmPasswordEl, {
        value: "password",
        target: { value: "password" },
      });
      context.rerender(component());
      await waitFor(() => {
        expect(confirmPasswordEl.value).toBe("password");
      });
    }
  });

  test("Validate old password widget", async () => {
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

    let value: PasswordValidateOldData = {
      oldPassword: "",
      password: "password",
      confirmPassword: "",
    };
    const changeData = (newValue: unknown) => {
      value = newValue as PasswordValidateOldData;
    };
    const context = render(
      <FormComponentView
        name="password"
        value={value}
        theme={basic}
        component={password}
        onChange={changeData}
      />,
    );
    const oldPasswordEl = context.container.querySelector(
      "#password_oldpassword",
    ) as HTMLInputElement;

    const passwordEl = context.container.querySelector(
      "#password",
    ) as HTMLInputElement;
    const confirmPasswordEl = context.container.querySelector(
      "#password_confirm",
    ) as HTMLInputElement;
    expect(passwordEl.value).toBe("password");
    expect(confirmPasswordEl.value).toBe("");
    if (passwordEl) {
      fireEvent.input(oldPasswordEl, {
        value: "password",
        target: { value: "password" },
      });
      await waitFor(() => {
        expect(value.oldPassword).toBe("password");
      });
      fireEvent.input(passwordEl, {
        value: "password2",
        target: { value: "password2" },
      });
      await waitFor(() => {
        expect(value.password).toBe("password2");
      });
      fireEvent.input(confirmPasswordEl, {
        value: "password",
        target: { value: "password" },
      });
      await waitFor(() => {
        expect(value.confirmPassword).toBe("password");
      });
    }
  });

  test("Old password validator", async () => {
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
  inputElementOk(
    passwordField({ name: "simple_password", label: "Simple password" }),
    "password:",
  );
});

function validate(form: FormDefinition, data: unknown) {
  const schema = generateSchema(form);
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
