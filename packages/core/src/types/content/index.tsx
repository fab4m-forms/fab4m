import * as React from "react";
import {
  FormComponentType,
  CreateFormComponentType,
  formComponent,
  FormComponent,
} from "../../component";
import { Widget, widget, WidgetProps, WidgetType } from "../../widget";
import { ReactNode } from "react";
import { useFormData } from "../../form";
/**
 * The content component type allows you to add any content as react components
 * to the form.
 * @group Components
 */
export const contentType: FormComponentType = {
  name: "content",
  title: "Content",
  description: "Add any react content to your form",
};

type WidgetSettings<Type> = (data: Type) => ReactNode;
type ContentWidgetType<Type> = WidgetType<unknown, WidgetSettings<Type>>;
type ContentWidget<Type> = Widget<unknown, WidgetSettings<Type>>;

/**
 * The content component allows you to add any content as react components
 * to the form.
 * @group Components
 */
export function content<DataType = Record<string, unknown>>(
  attributes: CreateFormComponentType<unknown>,
  renderContent: (value: DataType) => ReactNode
): FormComponent<unknown> {
  return formComponent({
    widget: contentWidget<DataType>(renderContent),
    settings: undefined,
    ...attributes,
    type: contentType,
  });
}

/**
 * The content widget.
 *
 * @group Widgets
 */
function Content<Type>(
  props: WidgetProps<unknown, WidgetSettings<Type>>
): React.ReactElement {
  const data = useFormData() as Type;
  return <>{props.settings(data)}</>;
}

/**
 * The content widget type renders any provided content into the form.
 * @group Widgets
 */
export const contentWidgetType: ContentWidgetType<Record<string, unknown>> = {
  name: "content",
  title: "Content",
  components: ["content"],
  widget: Content,
};

/**
 * A widget that renders any provided content into the form.
 *
 * See [the content component](/docs/components/content) for an example of how it works.
 *
 * @group Widgets
 */
export function contentWidget<DataType = Record<string, unknown>>(
  content: (value: DataType) => ReactNode
): ContentWidget<DataType> {
  return widget<unknown, WidgetSettings<DataType>>({
    type: {
      name: "content",
      title: "Content",
      components: ["content"],
      widget: Content,
    },
    settings: content,
  });
}
