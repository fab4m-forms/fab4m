import * as React from "react";
import { URLFieldWidgetSettings, WidgetProps } from "@fab4m/fab4m";
import { Input } from "../components/Input";

/**
 * Link componrent that renders a HTML input with the type url.
 * @group React widgets
 */
export function URLField(
  props: WidgetProps<string, URLFieldWidgetSettings>,
): React.JSX.Element {
  return <Input {...props} type="url" />;
}
