import * as React from "react";
import { Input, WidgetProps } from "@fab4m/fab4m";

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
