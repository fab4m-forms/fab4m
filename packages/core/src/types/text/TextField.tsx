import * as React from "react";
import { WidgetProps } from "../../widget";
import { TextFieldWidgetSettings } from ".";
import Input from "../../components/Input";
/**
 * The text field widget component renders a text input.
 * @group React widgets
 */
export default function TextField(
  props: WidgetProps<string, TextFieldWidgetSettings>,
): JSX.Element {
  return <Input {...props} type="text" />;
}
