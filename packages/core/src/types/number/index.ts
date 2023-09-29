import NumberField from "./NumberField";
import {
  FormComponentType,
  CreateFormComponentType,
  formComponent,
  FormComponent,
} from "../../component";
import { Widget, widget, WidgetType } from "../../widget";

/**
 * The integer field type manages integer fields.
 * @group Components
 */
export const integerFieldType: FormComponentType = {
  name: "integer",
  title: "Integer field",
  description: "Input number",
  dataType: "integer",
};

/**
 * The float field type manages integer data.
 * @group Components
 */
export const floatFieldType: FormComponentType = {
  name: "float",
  title: "Float field",
  description: "Input number",
  dataType: "float",
};

/**
 * The integer field manages integer data.
 * @group Components
 */
export function integerField(
  attributes: CreateFormComponentType<number>,
): FormComponent<number> {
  return formComponent({
    widget: numberFieldWidget(),
    settings: undefined,
    ...attributes,
    type: integerFieldType,
  });
}

/**
 * The integer field manages float data.
 * @group Components
 */
export function floatField(
  attributes: CreateFormComponentType<number>,
): FormComponent<number> {
  return formComponent({
    widget: numberFieldWidget(),
    settings: undefined,
    ...attributes,
    type: floatFieldType,
  });
}

export interface NumberWidgetSettings {
  prefix?: string;
}

/**
 * The number field widget type renders an html input element with the type number.
 * @group Widgets
 */
export const numberFieldWidgetType: WidgetType<number, NumberWidgetSettings> = {
  name: "numberfield",
  title: "Number field",
  components: ["integer", "float"],
  widget: NumberField,
  init: (settings) => numberFieldWidget(settings?.prefix),
};

/**
 * The number field widget renders an html input element with the type number.
 *
 * See the [integer field](/docs/components/integer) and the [float field](/docs/components/float) for examples.
 *
 * @group Widgets
 */
export function numberFieldWidget(
  prefix?: string,
): Widget<number, NumberWidgetSettings> {
  return widget({
    type: numberFieldWidgetType,
    settings: { prefix },
  });
}
