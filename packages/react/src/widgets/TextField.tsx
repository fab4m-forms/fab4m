import * as React from "react";
import { TextFieldWidgetSettings, WidgetProps } from "@fab4m/fab4m";
import { Input } from "../components/Input";

/**
 * The text field widget component renders a text input.
 * @group React widgets
 */
export function TextField(
  props: WidgetProps<string, TextFieldWidgetSettings>,
): React.JSX.Element {
  return <Input {...props} type="text" />;
}
