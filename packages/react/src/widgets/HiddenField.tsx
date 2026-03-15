import * as React from "react";
import { WidgetProps } from "@fab4m/fab4m";

/**
 * The Hidden widget renders a hidden input field.
 * @group React widgets
 */
export function HiddenField(
  props: WidgetProps<string | number, undefined>,
): React.JSX.Element {
  const component = props.component;
  return (
    <input
      type="hidden"
      required={component.required}
      disabled={component.disabled}
      data-testid={`hidden-${props.id}`}
      value={props.value ?? ""}
      name={props.name}
      id={props.id}
      {...props.attributes}
    />
  );
}
