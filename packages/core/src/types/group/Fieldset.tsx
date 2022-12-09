import * as React from "react";
import { WidgetProps } from "../..";
import GroupChildren from "./GroupChildren";

/**
 * Render a group of components in a HTML fieldset element.
 * @group React widgets
 */
export default function Fieldset<DataType = Record<string, unknown>>(
  props: WidgetProps<DataType, unknown>
): JSX.Element | null {
  if (!props.component.components) {
    return null;
  }
  return (
    <fieldset id={props.id} className={props.theme.classes.fieldset}>
      <legend className={props.theme.classes.fieldsetLegend}>
        {props.component.label}
      </legend>
      <GroupChildren {...(props as WidgetProps<unknown, unknown>)} />
    </fieldset>
  );
}
