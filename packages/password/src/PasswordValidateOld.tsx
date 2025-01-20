import * as React from "react";
import { WidgetProps, FormElement } from "@fab4m/fab4m";
import { PasswordValidateOldSettings, PasswordValidateOldData } from ".";

/**
 * This widget renders three password input fields: new password,
 * verify new password and old password.
 * @group React widgets
 */
export default function PasswordValidateOld(
  props: WidgetProps<PasswordValidateOldData, PasswordValidateOldSettings>,
): React.JSX.Element {
  const component = props.component;
  const confirmName = `${props.id}_confirm`;
  const confirmTitle = props.settings.confirmTitle
    ? props.settings.confirmTitle
    : "Confirm password";
  const oldPasswordLabel = props.settings.oldPasswordLabel ?? "Old password";
  const classes = props.theme.classes;
  return (
    <>
      <div className={props.theme.classes.componentWrapper}>
        <FormElement
          labelClass={classes.label}
          childrenClass={classes.elementWrapper}
          required={component.required}
          requiredText={props.labels?.required ?? "Required"}
          requiredClass={classes.requiredIndicator}
          labelWrapperClass={classes.labelWrapper}
          id={props.name}
          label={oldPasswordLabel}
        >
          <input
            type="password"
            className={classes.input}
            required={
              component.required ||
              (props.value && props.value.oldPassword.length > 0)
            }
            value={props.value?.oldPassword}
            onChange={(e) =>
              props.onChange({
                ...value(props.value),
                oldPassword: e.currentTarget.value,
              })
            }
            name={`${props.name}[oldpassword]`}
            id={`${props.id}_oldpassword`}
            {...props.attributes}
          />
        </FormElement>
      </div>
      <div className={props.theme.classes.componentWrapper}>
        <FormElement
          labelClass={classes.label}
          childrenClass={classes.elementWrapper}
          required={component.required}
          requiredText={props.labels?.required ?? "Required"}
          requiredClass={classes.requiredIndicator}
          labelWrapperClass={classes.labelWrapper}
          id={props.id}
          label={component.label}
        >
          <input
            type="password"
            className={classes.input}
            required={component.required}
            value={props.value?.password}
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
        </FormElement>
      </div>
      <div className={props.theme.classes.componentWrapper}>
        <FormElement
          labelClass={classes.label}
          childrenClass={classes.elementWrapper}
          required={component.required}
          requiredText={props.labels?.required ?? "Required"}
          requiredClass={classes.requiredIndicator}
          labelWrapperClass={classes.labelWrapper}
          id={confirmName}
          label={confirmTitle}
        >
          <input
            type="password"
            className={classes.input}
            required={component.required}
            value={props.value?.confirmPassword}
            onChange={(e) =>
              props.onChange({
                ...value(props.value),
                confirmPassword: e.currentTarget.value,
              })
            }
            name={`${props.name}[confirmPassword]`}
            id={`${props.id}_confirm`}
            pattern={props.value ? `^${props.value.password}$` : undefined}
          />
          {props.value &&
            props.value.password.length > 0 &&
            props.value.confirmPassword === props.value.password && (
              <div className={classes.descriptionOk}>The password matches!</div>
            )}
        </FormElement>
      </div>
    </>
  );
}

const defaultValue: PasswordValidateOldData = {
  password: "",
  oldPassword: "",
  confirmPassword: "",
};

function value(val?: PasswordValidateOldData) {
  return val ?? defaultValue;
}
