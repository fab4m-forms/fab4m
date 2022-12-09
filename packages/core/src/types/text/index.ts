import TextField from "./TextField";
import TextArea from "./TextArea";
import {
  FormComponentType,
  FormComponent,
  CreateFormComponentType,
  formComponent,
} from "../../component";
import { Widget, widget, WidgetType } from "../../widget";

/**
 * The text field component type handles text inputs.
 * @group Components
 */
export const textFieldType: FormComponentType = {
  name: "text",
  title: "Text field",
  description: "Input text data",
  dataType: "string",
};

/**
 * The text area component type handles text area inputs.
 * It's just a copy of the text field that's here for convenience.
 * @group Components
 */
export const textAreaFieldType: FormComponentType = {
  name: "text",
  title: "Text Area",
  description: "Input text data in a text area.",
  dataType: "string",
};

const defaultTextField = () => ({
  widget: textFieldWidget(),
  settings: undefined,
});

/**
 * The text field component manages string inputs of
 * different kinds, and should be used whenever you want to
 * provide a way to enter text.
 *
 * @group Components
 */
export function textField(
  attributes: CreateFormComponentType<string>
): FormComponent<string> {
  return formComponent<string>({
    ...defaultTextField(),
    ...attributes,
    type: textFieldType,
  });
}

/**
 * The text area component is just a shorthand for
 * a text field with a text area widget.
 * @group Components
 */
export function textAreaField(
  attributes: CreateFormComponentType<string>
): FormComponent<string> {
  return formComponent<string>({
    ...defaultTextField(),
    widget: textAreaWidget(),
    ...attributes,
    type: textAreaFieldType,
  });
}

/**
 * Settings for the text field widget.
 * @group Components
 */
export interface TextFieldWidgetSettings {
  /** Use this to provide a prefixed text before the text input. */
  prefix?: string;
}

/**
 * The text field widget type provides a text input field.
 * @group Components
 */
export const textFieldWidgetType: WidgetType<string, TextFieldWidgetSettings> =
  {
    name: "textfield",
    title: "Text field",
    components: ["text"],
    widget: TextField,
    init: (settings) => textFieldWidget(settings?.prefix),
  };

/**
 * A text input field that can be used with the text component.
 * See the [text field component](/docs/components/textfield) for an example.
 * @group Widgets
 */
export function textFieldWidget(
  prefix?: string
): Widget<string, TextFieldWidgetSettings> {
  return widget<string, TextFieldWidgetSettings>({
    type: textFieldWidgetType,
    settings: { prefix },
  });
}

/**
 * A widget type that provides a text area element.
 * @group Widgets
 */
export const textAreaWidgetType: WidgetType<string, unknown> = {
  name: "textarea",
  title: "Text area",
  components: ["text"],
  widget: TextArea,
  init: textAreaWidget,
};

/**
 * Provides a text area element.
 * See the [text area component](/docs/components/textarea) for an example.
 * @group Widgets
 */
export function textAreaWidget(): Widget<string, unknown> {
  return widget<string, unknown>({
    type: textAreaWidgetType,
    settings: undefined,
  });
}
