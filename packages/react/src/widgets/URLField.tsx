import * as React from "react";
import { Input, WidgetProps } from "@fab4m/fab4m";
import { URLFieldWidgetSettings } from "@fab4m/fab4m";

/**
 * Link componrent that renders a HTML input with the type url.
 * @group React widgets
 */
export default function URLField(
  props: WidgetProps<string, URLFieldWidgetSettings>,
): React.JSX.Element {
  return <Input {...props} type="url" />;
}
