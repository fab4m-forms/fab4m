import * as React from "react";
import { WidgetProps } from "@fab4m/fab4m";
import { GroupChildren } from "./GroupChildren";

/**
 * Render a group of components by just adding a div around them.
 * @group React widgets
 */
export function Group<DataType = Record<string, unknown>>(
  props: WidgetProps<DataType, unknown>,
): React.JSX.Element | null {
  if (!props.component.components) {
    return null;
  }

  return (
    <div id={props.id} className={props.theme.classes.group}>
      <GroupChildren {...(props as WidgetProps<unknown, unknown>)} />
    </div>
  );
}
