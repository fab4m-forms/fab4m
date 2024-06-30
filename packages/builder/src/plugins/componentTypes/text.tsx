import {
  textAreaWidgetType,
  textField,
  textFieldType,
  textFieldWidgetType,
} from "@fab4m/fab4m";
import { FormComponentTypePlugin, WidgetTypePlugin } from "src";

export const textFieldPlugin: FormComponentTypePlugin = {
  type: textFieldType,
  init: (attributes) => textField(attributes),
};

export const textFieldWidgetPlugin: WidgetTypePlugin = {
  type: textFieldWidgetType,
};

export const textAreaWidgetPlugin: WidgetTypePlugin = {
  type: textAreaWidgetType,
};
