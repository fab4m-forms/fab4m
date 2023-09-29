import PasswordVerify from "./PasswordVerify";
import {
  FormComponentType,
  CreateFormComponentType,
  FormComponent,
  formComponent,
  Widget,
  widget,
  WidgetType,
} from "@fab4m/fab4m";
import PasswordValidateOld from "./PasswordValidateOld";
import Password from "./Password";

/**
 * Widget settings for the password widget.
 * @group Components
 */
export interface PasswordSettings {
  confirmTitle: string;
}

/**
 * Widget settings for the passwordValidateOld widget.
 * @group Widgets
 */
export interface PasswordValidateOldSettings extends PasswordSettings {
  oldPasswordLabel: string;
}

/**
 * The Password component type allows handling password data.
 * @group Components
 */
export const passwordFieldType: FormComponentType = {
  name: "password",
  title: "Password",
  dataType: "string",
};

/**
 * The required data that is needed to perform a password verification.
 * @group Components
 */
export interface PasswordVerifyData {
  password: string;
  confirmPassword: string;
}

/**
 * The required data that is needed to perform a password verification
 * with the old password.
 * @group Components
 */
export interface PasswordValidateOldData extends PasswordVerifyData {
  oldPassword: string;
}

/**
 * A component type that let's a user input a password along with a field to verify
 * that the password is correct.
 * @group Components
 */
export const passwordVerifyFieldType: FormComponentType = {
  name: "passwordVerify",
  title: "Password (With verification)",
  dataType: "object",
  schema: (component) => ({
    type: "object",
    title: component.label,
    properties: {
      password: { type: "string", title: "Password" },
      confirmPassword: {
        type: "string",
        title: "Confirm password",
        const: {
          $data: `/${component.name}/password`,
        },
      },
    },
    required: component.required ? ["password", "confirmPassword"] : undefined,
  }),
  schemaErrorMessages: () => ({
    "properties/confirmPassword/const": () => "The passwords don't match",
  }),
};

/**
 * A component type that let's a user input a password along with a field to verify
 * that the password is correct and a field to input the old password.
 * @group Components
 */
export const passwordValidateOldFieldType: FormComponentType = {
  name: "passwordValidateOld",
  title: "Password, Validate old password",
  dataType: "string",
  schema: (component) => ({
    type: "object",
    title: component.label,
    properties: {
      password: {
        type: "string",
        title: "Password",
        minLength: component.required ? 1 : undefined,
      },
      confirmPassword: {
        type: "string",
        title: "Confirm password",
        minLength: component.required ? 1 : undefined,
      },
      oldPassword: {
        type: "string",
        title: "Old password",
        minLength: component.required ? 1 : undefined,
      },
    },
    required: component.required
      ? ["password", "confirmPassword", "oldPassword"]
      : undefined,
  }),
};

/**
 * The Password field allows handling of password data.
 * @group Components
 */
export function passwordField(
  attributes: CreateFormComponentType<string>,
): FormComponent<string> {
  return formComponent<string>({
    settings: undefined,
    type: passwordFieldType,
    widget: passwordWidget(),
    ...attributes,
  });
}

/**
 * A component that let's a user input a password along with a field to verify
 * that the password is correct.
 * @group Components
 */
export function passwordVerifyField(
  attributes: CreateFormComponentType<PasswordVerifyData>,
): FormComponent<PasswordVerifyData> {
  return formComponent<PasswordVerifyData>({
    settings: {},
    widget: passwordVerifyWidget(),
    type: passwordVerifyFieldType,
    ...attributes,
  });
}

/**
 * A component that let's a user input a password along with a field to verify
 * that the password is correct and a field to input the old password.
 * @group Components
 */
export function passwordValidateOldField(
  attributes: CreateFormComponentType<PasswordValidateOldData>,
): FormComponent<PasswordValidateOldData> {
  return formComponent({
    settings: {},
    widget: passwordValidateOldWidget(),
    type: passwordValidateOldFieldType,
    ...attributes,
  });
}

/**
 * The password widget type renders an input with the type password.
 * @group Widgets
 */
export const passwordWidgetType: WidgetType<string, undefined> = {
  name: "password",
  title: "Password",
  widget: Password,
  components: ["password"],
  init: passwordWidget,
};

/**
 * The password widget renders an input with the type password.
 * @group Widgets
 */
export function passwordWidget(): Widget<string, undefined> {
  return widget({
    type: passwordWidgetType,
    settings: undefined,
  });
}

/**
 * The password verify widget type renders a password with an extra field
 * that let's the user verify that the inserted password is correct.
 * @group Widgets
 */
export const passwordVerifyWidgetType: WidgetType<
  PasswordVerifyData,
  PasswordSettings
> = {
  name: "passwordVerify",
  title: "Password",
  widget: PasswordVerify,
  components: ["passwordVerify"],
  init: (settings) => passwordVerifyWidget(settings?.confirmTitle),
};

/**
 * The password verify widget renders a password with an extra field
 * that let's the user verify that the inserted password is correct.
 * @group Widgets
 */
export function passwordVerifyWidget(
  confirmTitle = "Confirm password",
): Widget<PasswordVerifyData, PasswordSettings> {
  return widget({
    type: passwordVerifyWidgetType,
    settings: { confirmTitle: confirmTitle },
  });
}

/**
 * The password verify widget renders a password with an extra field
 * that let's the user verify that the inserted password is correct and
 * an additional field to validate their old password.
 * @group Widgets
 */
export const passwordValidateOldWidgetType: WidgetType<
  PasswordValidateOldData,
  PasswordValidateOldSettings
> = {
  name: "passwordValidateOld",
  title: "Password",
  widget: PasswordValidateOld,
  components: ["passwordValidateOld"],
};

/**
 * The password verify widget renders a password with an extra field
 * that let's the user verify that the inserted password is correct and
 * an additional field to validate their old password.
 * @group Widgets
 */
export function passwordValidateOldWidget(): Widget<
  PasswordValidateOldData,
  PasswordValidateOldSettings
> {
  return widget({
    type: passwordValidateOldWidgetType,
    settings: {
      confirmTitle: "Confirm password",
      oldPasswordLabel: "Old password",
    },
  });
}

export * from "./validators";
