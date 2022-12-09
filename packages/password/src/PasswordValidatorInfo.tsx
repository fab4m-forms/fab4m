import * as React from "react";
import { ValidationSettings } from "./validators";
import CheckIcon from "./CheckIcon";
import { PasswordVerifyData } from ".";
import { Theme, ValidatorInfoProps } from "fab4m";

/**
 * The password validator info component renders information
 * about what the password needs to include.
 * @group Internal React API
 */
export default function PasswordValidatorInfo(
  props: ValidatorInfoProps<PasswordVerifyData | string, ValidationSettings>
): JSX.Element | null {
  const rules = [];
  if (!props.value) {
    return null;
  }
  const password =
    typeof props.value === "string" ? props.value : props.value.password;

  if (props.settings.requiredLetter) {
    rules.push(
      <li className={props.theme.classes.descriptionItem} key={rules.length}>
        <Valid valid={/\w/.test(password)} theme={props.theme} />
        <span>The password needs to include at least one letter</span>
      </li>
    );
  }
  if (props.settings.requiredNumber) {
    rules.push(
      <li className={props.theme.classes.descriptionItem} key={rules.length}>
        <Valid valid={/[0-9]/.test(password)} theme={props.theme} />
        <span>The password needs to include at least one number</span>
      </li>
    );
  }
  if (props.settings.requiredSpecialChar) {
    rules.push(
      <li className={props.theme.classes.descriptionItem} key={rules.length}>
        <Valid valid={/[@$!%*#?&]/.test(password)} theme={props.theme} />
        <span>
          The password needs to include at least one special character
        </span>
      </li>
    );
  }
  return (
    <ul className={props.theme.classes.descriptionList}>
      <li className={props.theme.classes.descriptionItem}>
        <Valid
          valid={password.length >= props.settings.minLength}
          theme={props.theme}
        />
        <span>
          The password needs to contain at least {props.settings.minLength}{" "}
          characters
        </span>
      </li>
      {rules}
    </ul>
  );
}

/**
 * Render a checkmark next to a rule if it's valid.
 */
function Valid(props: { valid: boolean; theme: Theme }) {
  const classes = props.theme.classes;
  return props.valid ? (
    <CheckIcon className={classes.descriptionItemIcon} />
  ) : (
    <div className={classes.descriptionItemPlaceholder} />
  );
}
