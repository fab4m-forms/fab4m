import * as React from "react";
import { WidgetProps } from "@fab4m/fab4m";
import { FormComponentWrapper } from "../components/FormComponentWrapper";

/**
 * The text area widget allows you to render a textarea html element.
 * @group React widgets
 */
export function TextArea(
  props: WidgetProps<string, unknown>,
): React.JSX.Element {
  const component = props.component;
  return (
    <FormComponentWrapper {...props}>
      <textarea
        className={props.theme.classes.textarea}
        required={component.required}
        value={props.value}
        disabled={component.disabled}
        onChange={(e) => props.onChange(e.currentTarget.value)}
        name={props.name}
        id={props.id}
        {...props.attributes}
      />
    </FormComponentWrapper>
  );
}
