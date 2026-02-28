import * as React from "react";
import { WidgetProps } from "@fab4m/fab4m";
import { SubmitWidgetSettings } from "@fab4m/fab4m";

/**
 * @group React widgets
 */
export default function Submit(
  props: WidgetProps<unknown, SubmitWidgetSettings>,
): React.ReactElement {
  return (
    <input
      className={props.theme.classes.submitButton}
      type="submit"
      value={props.settings.title}
      name={props.name}
    />
  );
}
