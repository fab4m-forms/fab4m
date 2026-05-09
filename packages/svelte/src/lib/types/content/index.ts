import { type Component, type Snippet } from "svelte";
import type {
  FormComponentType,
  CreateFormComponentType,
  FormComponent,
  Widget,
  WidgetProps,
  WidgetType,
} from "@fab4m/fab4m";
import {
  formComponent,
  widget,
} from "@fab4m/fab4m";
import ContentComponent from "./index.svelte";

/**
 * The content component type allows you to add any content as Svelte snippets
 * to the form.
 * @group Components
 */
export const contentType: FormComponentType = {
  name: "content",
  title: "Content",
  description: "Add any content to your form",
};

type WidgetSettings<Type> = Snippet<[Type]>;
type ContentWidgetType<Type> = WidgetType<undefined, WidgetSettings<Type>>;
type ContentWidget<Type> = Widget<undefined, WidgetSettings<Type>>;

/**
 * The content component allows you to add any content as Svelte snippets
 * to the form.
 * @group Components
 */
export function content<DataType = Record<string, unknown>>(
  attributes: CreateFormComponentType<undefined>,
  renderContent: Snippet<[DataType]>,
): FormComponent<any> {
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
export const Content = ContentComponent as Component<WidgetProps<undefined, Snippet<[Record<string, unknown>]>>>;

/**
 * The content widget type renders any provided content into the form.
 * @group Widgets
 */
export const contentWidgetType: ContentWidgetType<Record<string, unknown>> = {
  name: "content",
  title: "Content",
  components: ["content"],
};

/**
 * A widget that renders any provided content into the form.
 *
 * See [the content component](/docs/components/content) for an example of how it works.
 *
 * @group Widgets
 */
export function contentWidget<DataType = Record<string, unknown>>(
  content: Snippet<[DataType]>,
): ContentWidget<DataType> {
  return widget<undefined, WidgetSettings<DataType>>({
    type: {
      name: "content",
      title: "Content",
      components: ["content"],
    },
    settings: content,
  });
}
