import * as React from "react";
import Input from "../../components/Input";
import { WidgetProps } from "../../widget";
/**
 * An email field widget.
 * @group React widgets
 */
export default function EmailField(
  props: WidgetProps<string, unknown | undefined>,
): React.JSX.Element {
  const inputProps = {
    ...props,
    settings: undefined,
  };
  return <Input {...inputProps} type="email" />;
}
