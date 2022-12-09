import * as React from "react";
import { WidgetProps, FormComponentWrapper } from "fab4m";
import { PasswordSettings, PasswordVerifyData } from ".";
/**
 * The password Verify component renders a password input field
 * and a field to verify that password.
 * @group React widgets
 */
export default function PasswordVerify(
  props: WidgetProps<PasswordVerifyData, PasswordSettings>
): JSX.Element {
  const component = props.component;
  const confirmName = `${props.id}_confirm`;
  const confirmTitle = props.settings.confirmTitle
    ? props.settings.confirmTitle
    : "Confirm password";

  return (
    <>
      <div className={props.theme.classes.componentWrapper}>
        <FormComponentWrapper {...props}>
          <input
            type="password"
            className={props.theme.classes.input}
            required={component.required}
            value={props.value?.password ?? ""}
            onChange={(e) =>
              props.onChange({
                ...value(props.value),
                password: e.currentTarget.value,
              })
            }
            name={`${props.name}[password]`}
            id={props.id}
            {...props.attributes}
          />
        </FormComponentWrapper>
      </div>
      <div className={props.theme.classes.componentWrapper}>
        <FormComponentWrapper {...props} id={confirmName} label={confirmTitle}>
          <input
            type="password"
            className={props.theme.classes.input}
            required={component.required || !!props.value?.password}
            value={props.value?.confirmPassword ?? ""}
            onChange={(e) =>
              props.onChange({
                ...value(props.value),
                confirmPassword: e.currentTarget.value,
              })
            }
            name={`${props.name}[confirmPassword]`}
            id={`${props.id}-confirmPassword`}
            pattern={props.value ? `^${props.value.password}$` : undefined}
          />
          {props.value &&
            props.value.password.length > 0 &&
            props.value.confirmPassword === props.value.password && (
              <div className={props.theme.classes.descriptionOk}>
                The password matches!
              </div>
            )}
        </FormComponentWrapper>
      </div>
    </>
  );
}
const defaultValue: PasswordVerifyData = {
  password: "",
  confirmPassword: "",
};
function value(val?: PasswordVerifyData) {
  return val ?? defaultValue;
}
