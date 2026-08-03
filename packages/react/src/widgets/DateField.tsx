import * as React from "react";
import { WidgetProps } from "@fab4m/fab4m";
import { FormComponentWrapper } from "../components/FormComponentWrapper";

function toDateInputValue(value?: Date): string {
  return value ? value.toISOString().slice(0, 10) : "";
}

/**
 * A native date input widget.
 * See [the date component page](/docs/components/date) for an example.
 * @group React widgets
 */
export function DateField(
  props: WidgetProps<Date, undefined>,
): React.JSX.Element {
  const classes = props.theme.classes;
  return (
    <FormComponentWrapper {...props}>
      <input
        type="date"
        className={classes.input}
        required={props.component.required}
        disabled={props.component.disabled}
        value={toDateInputValue(props.value)}
        onChange={(e) =>
          props.onChange(
            e.currentTarget.value ? new Date(e.currentTarget.value) : undefined,
          )
        }
        name={props.name}
        id={props.id}
        {...props.attributes}
      />
    </FormComponentWrapper>
  );
}
