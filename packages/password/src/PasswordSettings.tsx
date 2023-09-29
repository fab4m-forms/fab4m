import * as React from "react";
import { ValidationSettings } from "./validators";

/**
 * A component to render a list of password errors.
 * @group Internal React API
 */
function PasswordRule(props: {
  value: string;
  pattern: RegExp;
  description: string;
}): JSX.Element {
  const valid = props.pattern.test(props.value);
  return (
    <li className={`password-rule ${valid ? "valid" : "invalid"}}`}>
      {props.description}
    </li>
  );
}

/**
 * The password strength component checks the inputted password length
 * and inputs hints to increase the password strength.
 * @group Internal React API
 */
export default function PasswordStrength(props: {
  value: string;
  settings: ValidationSettings;
}): JSX.Element {
  const rules = [];
  if (props.settings.minLength > 0) {
    rules.push(
      <li
        className={`password-rule ${
          props.value.length >= props.settings.minLength ? "valid" : "invalid"
        }}`}
      ></li>,
    );
  }

  if (props.settings.requiredLetter) {
    rules.push(
      <PasswordRule
        value={props.value}
        pattern={/\w/}
        description={"Must contain at least one letter"}
      />,
    );
  }
  if (props.settings.requiredNumber) {
    rules.push(
      <PasswordRule
        value={props.value}
        pattern={/\d/}
        description={"Must contain at least one number"}
      />,
    );
  }
  if (props.settings.requiredSpecialChar) {
    rules.push(
      <PasswordRule
        value={props.value}
        pattern={/[@$!%*#?&]/}
        description={"Must contain at least one special character"}
      />,
    );
  }
  return <ul className="password-rules">{rules}</ul>;
}
