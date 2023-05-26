import * as React from "react";
import { widget, WidgetProps, WidgetType } from "../widget";

type HiddenType = string | number;
/**
 * The radios widget renders the options as a serios of radio buttons.
 * @group Widgets
 */
export const hiddenFieldWidgetType: WidgetType<string | number, undefined> = {
  name: "hidden",
  title: "Hidden",
  components: ["text", "integer", "float"],
  widget: HiddenField,
  init: () => hiddenFieldWidget(),
};

export function hiddenFieldWidget<Type extends HiddenType>() {
  return widget<Type, undefined>({
    type: hiddenFieldWidgetType as unknown as WidgetType<Type, undefined>,
    settings: undefined,
  });
}

/**
 * The Hidden widget renders a hidden input field.
 * @group React widgets
 */
function HiddenField(props: WidgetProps<string | number, undefined>) {
  const component = props.component;
  return (
    <input
      type="hidden"
      required={component.required}
      disabled={component.disabled}
      data-testid={`hidden-${props.id}`}
      value={props.value ?? ""}
      name={props.name}
      id={props.id}
      {...props.attributes}
    />
  );
}

export default HiddenField as React.FC;
