import {
  floatField,
  floatFieldType,
  integerField,
  integerFieldType,
  numberFieldWidgetType,
} from "@fab4m/fab4m";
import { FormComponentTypePlugin, WidgetTypePlugin } from "../..";

export const integerFieldPlugin: FormComponentTypePlugin = {
  type: integerFieldType,
  init: (attributes) => integerField(attributes),
};

export const floatFieldPlugin: FormComponentTypePlugin = {
  type: floatFieldType,
  init: (attributes) => floatField(attributes),
};

export const numberFieldWidgetPlugin: WidgetTypePlugin = {
  type: numberFieldWidgetType,
};
