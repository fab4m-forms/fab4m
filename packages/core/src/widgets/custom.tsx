import * as React from "react";
import {
  multipleWidget,
  MultipleWidgetProps,
  MultipleWidgetType,
  widget,
  WidgetProps,
  WidgetType,
} from "../widget";

type CustomWidget<ValueType> = React.FunctionComponent<
  WidgetProps<ValueType, CustomWidget<ValueType>>
>;

type CustomMultipleWidget<ValueType> = React.FunctionComponent<
  MultipleWidgetProps<ValueType, CustomMultipleWidget<ValueType>>
>;

/**
 * The custom widget allows you to easily customize your markup
 * completely for a component. This let's you skip the work
 * of writing a widget type definition.
 *
 * :::caution
 * Do not use this widget if you intend to serialize the form.
 * :::
 *
 * :::caution
 * It's up to you to make sure you call the onChange() function
 * to update the value of the form here. Also note that if you
 * intend to submit this form as post data, then you need to ensure
 * your form fields have proper names.
 * :::
 *
 * @group Widgets
 */
export const customWidgetType: WidgetType<any, CustomWidget<any>> = {
  name: "custom",
  title: "Custom",
  components: [],
  widget: (props) => <props.settings {...props} />,
  init: () => customWidget(() => null),
};

/**
 * The custom widget allows you to easily customize your markup
 * completely for a component. This let's you skip the work
 * of writing a widget type definition.
 *
 * :::caution
 * Do not use this widget if you intend to serialize the form.
 * :::
 *
 * :::caution
 * It's up to you to make sure you call the onChange() function
 * to update the value of the form here. Also note that if you
 * intend to submit this form as post data, then you need to ensure
 * your form fields have proper names.
 * :::
 *
 * @group Widgets
 */
export function customWidget<ValueType = unknown>(
  component: CustomWidget<ValueType>,
) {
  return widget<ValueType, CustomWidget<ValueType>>({
    type: customWidgetType,
    settings: component,
  });
}

/**
 * The custom multiple widget renders any custom markup you may want into the form.
 * @group Widgets
 */
export const customMultipleWidgetType: MultipleWidgetType<
  any,
  CustomMultipleWidget<any>
> = {
  name: "custom",
  title: "Custom",
  widget: (props) => <props.settings {...props} />,
  init: () => customMultipleWidget(() => null),
};

/**
 * The custom multiple widget renders any custom markup you may want into the form.
 * @group Widgets
 */
export function customMultipleWidget<ValueType = unknown>(
  component: CustomMultipleWidget<ValueType>,
) {
  return multipleWidget<ValueType, CustomMultipleWidget<ValueType>>({
    type: customMultipleWidgetType,
    settings: component,
  });
}
