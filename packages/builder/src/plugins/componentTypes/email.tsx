import { emailField, emailFieldType, emailWidgetType } from "@fab4m/fab4m";
import { FormComponentTypePlugin, WidgetTypePlugin } from "../..";

export const emailFieldPlugin: FormComponentTypePlugin = {
  type: emailFieldType,
  init: (attributes) => emailField(attributes),
};

export const emailFieldWidgetPlugin: WidgetTypePlugin<{ prefix?: string }> = {
  type: emailWidgetType,
};
