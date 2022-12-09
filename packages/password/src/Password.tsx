import * as React from "react";
import { Input, WidgetProps } from "fab4m";

/**
 * The password widget component renders a password input element.
 * @group React widgets
 */
function Password(props: WidgetProps<string, undefined>) {
  return <Input {...props} type="password" />;
}

export default Password as React.FC;
