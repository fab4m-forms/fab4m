import * as React from "react";
import { ThemeClasses } from "../theme";
import { ValidationError } from "../validator";

/**
 * Render a list of validation errors.
 * @group React widget API
 */
export default function ValidationErrors(props: {
  errors: ValidationError[];
  classes: ThemeClasses;
}): JSX.Element {
  const info = props.errors.map((e, i) => (
    <li key={i} className={props.classes.errorItem}>
      {e.message}
    </li>
  ));
  return <ul className={props.classes.errorList}>{info}</ul>;
}
