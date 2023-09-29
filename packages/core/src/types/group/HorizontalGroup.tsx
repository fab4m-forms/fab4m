import * as React from "react";
import { WidgetProps } from "../..";
import GroupChildren from "./GroupChildren";

/**
 * Render a group of components horizontally.
 * @group React widgets
 */
export default function HorizontalGroup<DataType>(
  props: WidgetProps<DataType, unknown>,
): JSX.Element | null {
  if (!props.component.components) {
    return null;
  }
  return (
    <div id={props.id} className={props.theme.classes.horizontalGroup}>
      <GroupChildren
        {...(props as WidgetProps<unknown, unknown>)}
        wrapperClass={props.theme.classes.horizontalGroupComponentWrapper}
      />
    </div>
  );
}
