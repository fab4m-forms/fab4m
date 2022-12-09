import * as React from "react";
import { WidgetProps } from "../widget";
import FormComponentWrapper from "./FormComponentWrapper";
/**
 * @internal
 */
export default function Input(
  props: WidgetProps<string, { prefix?: string } | undefined> & { type: string }
): JSX.Element {
  const component = props.component;
  const classes = props.theme.classes;
  return (
    <FormComponentWrapper {...props} prefix={props.settings?.prefix}>
      <input
        type={props.type}
        className={classes.input}
        required={component.required}
        disabled={component.disabled}
        value={props.value ?? ""}
        onChange={(e) => props.onChange(e.currentTarget.value)}
        name={props.name}
        id={props.id}
        {...props.attributes}
      />
    </FormComponentWrapper>
  );
}
