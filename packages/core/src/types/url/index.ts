import {
  FormComponentType,
  FormComponent,
  CreateFormComponentType,
  formComponent,
} from "../../component";
import { Widget, widget, WidgetType } from "../../widget";
import URLField from "./URLField";
/**
 * The url component type handles url inputs
 * @group Components
 */
export const urlFieldType: FormComponentType = {
  name: "url",
  title: "URL field",
  description: "Input a URL",
  dataType: "string",
  schema: (component, defaultSchema) => ({
    ...defaultSchema,
    type: "string",
    format: "uri",
  }),
};

/**
 * The url component handles url inputs
 * The JSON Schema will be a string with the uri format.
 * @group Components
 */
export function urlField(
  attributes: CreateFormComponentType<string>,
): FormComponent<string> {
  return formComponent({
    widget: linkFieldWidget(),
    settings: undefined,
    ...attributes,
    type: urlFieldType,
  });
}

/**
 * @group Widgets
 */
export interface URLFieldWidgetSettings {
  prefix?: string;
}

/**
 * The link widget type renders an html input element with the type url.
 * @group Widgets
 */
export const linkFieldWidgetType: WidgetType<string, URLFieldWidgetSettings> = {
  name: "linkfield",
  title: "Link",
  components: ["url"],
  widget: URLField,
  init: (settings) => linkFieldWidget(settings?.prefix),
};

/**
 * The link widget renders an html input element with the type url.
 *
 * See [the url component page](/docs/components/url) for an example of how it works.
 *
 * @group Widgets
 */
export function linkFieldWidget(
  prefix?: string,
): Widget<string, URLFieldWidgetSettings> {
  return widget<string, URLFieldWidgetSettings>({
    type: linkFieldWidgetType,
    settings: { prefix },
  });
}
