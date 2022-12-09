import {
  CreateFormComponentType,
  FormComponent,
  formComponent,
  FormComponentType,
} from "../../component";
import { Widget, widget, WidgetType } from "../../widget";
import EmailField from "./EmailField";

/**
 * Let users input email adresses.
 * @group Components
 */
export const emailFieldType: FormComponentType = {
  name: "email",
  title: "Email",
  dataType: "string",
  schema: (component, defaultSchema) => ({
    ...defaultSchema,
    type: "string",
    format: "email",
  }),
};

/**
 * Let users input email adresses.
 * @group Components
 */
export function emailField(
  attributes: CreateFormComponentType<string>
): FormComponent<string> {
  return formComponent({
    settings: undefined,
    widget: emailWidget(),
    type: emailFieldType,
    ...attributes,
  });
}

/**
 * Let users input email adresses.
 * @group Widgets
 */
export const emailWidgetType: WidgetType<string, undefined> = {
  name: "email",
  components: ["email"],
  title: "Email field",
  widget: EmailField,
  init: emailWidget,
};

/**
 * Let users input email adresses.
 *
 * See [the email component page](/docs/components/email) for an example of how it works.
 *
 * @group Widgets
 */
export function emailWidget(): Widget<string, undefined> {
  return widget({
    type: emailWidgetType,
    settings: undefined,
  });
}
