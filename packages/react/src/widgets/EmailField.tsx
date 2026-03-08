import * as React from "react";
import { WidgetProps } from "@fab4m/fab4m";
import { Input } from "../components/Input";

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
