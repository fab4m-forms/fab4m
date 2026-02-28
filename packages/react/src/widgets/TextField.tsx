import * as React from "react";
import { Input, WidgetProps } from "@fab4m/fab4m";
import { TextFieldWidgetSettings } from "@fab4m/fab4m";

/**
 * The text field widget component renders a text input.
 * @group React widgets
 */
export default function TextField(
  props: WidgetProps<string, TextFieldWidgetSettings>,
): React.JSX.Element {
  return <Input {...props} type="text" />;
}
