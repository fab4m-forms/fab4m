import * as React from "react";
import { WidgetProps } from "../..";
import GroupChildren from "./GroupChildren";

/**
 * Render a group of components by just adding a div around them.
 * @group React widgets
 */
export default function Group<DataType = Record<string, unknown>>(
  props: WidgetProps<DataType, unknown>,
): JSX.Element | null {
  if (!props.component.components) {
    return null;
  }

  return (
    <div id={props.id} className={props.theme.classes.group}>
      <GroupChildren {...(props as WidgetProps<unknown, unknown>)} />
    </div>
  );
}
