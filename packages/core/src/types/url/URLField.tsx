import * as React from "react";
import { WidgetProps } from "../../widget";
import { URLFieldWidgetSettings } from ".";
import Input from "../../components/Input";

/**
 * Link componrent that renders a HTML input with the type url.
 * @group React widgets
 */
export default function URLField(
  props: WidgetProps<string, URLFieldWidgetSettings>,
): React.JSX.Element {
  return <Input {...props} type="url" />;
}
