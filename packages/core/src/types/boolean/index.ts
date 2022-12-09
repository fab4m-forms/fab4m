import Checkbox from "./Checkbox";
import {
  FormComponentType,
  FormComponent,
  CreateFormComponentType,
  formComponent,
} from "../../component";
import { Widget, widget, WidgetType } from "../../widget";

/**
 * The boolean field types allows users to provide boolean values.
 * @group Components
 */
export const booleanFieldType: FormComponentType = {
  name: "boolean",
  title: "Yes/No",
  description: "A simple yes/no toggle",
  dataType: "boolean",
};

/**
 * The boolean field lets users input true or false values.
 * The default widget for this field is a checkbox widget.
 * @group Components
 */
export function booleanField(
  attributes: CreateFormComponentType<boolean>
): FormComponent<boolean> {
  return formComponent({
    settings: undefined,
    type: booleanFieldType,
    widget: checkboxWidget(),
    ...attributes,
  });
}

/**
 * The checkbox widget type provides the user with a checkbox input element.
 * @group Widgets
 */
export const checkboxWidgetType: WidgetType<boolean, undefined> = {
  name: "checkbox",
  title: "Checkbox",
  components: ["boolean"],
  widget: Checkbox,
  init: checkboxWidget,
};

/**
 * The checkbox widget provides the user with a checkbox input element.
 * @group Widgets
 */
export function checkboxWidget(): Widget<boolean, undefined> {
  return widget({
    type: checkboxWidgetType,
    settings: undefined,
  });
}
