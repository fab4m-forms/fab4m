import {
  booleanField,
  booleanFieldType,
  checkboxWidgetType,
} from "@fab4m/fab4m";
import { FormComponentTypePlugin, WidgetTypePlugin } from "../..";

export const booleanFieldPlugin: FormComponentTypePlugin = {
  type: booleanFieldType,
  init: (attributes) => booleanField(attributes),
};

export const checkboxWidgetPlugin: WidgetTypePlugin<{ prefix?: string }> = {
  type: checkboxWidgetType,
};
