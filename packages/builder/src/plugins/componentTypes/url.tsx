import { urlField, urlFieldType, linkFieldWidgetType } from "@fab4m/fab4m";
import { FormComponentTypePlugin, WidgetTypePlugin } from "src";

export const urlFieldPlugin: FormComponentTypePlugin = {
  type: urlFieldType,
  init: (attributes) => urlField(attributes),
};

export const linkFieldWidgetPlugin: WidgetTypePlugin<{ prefix?: string }> = {
  type: linkFieldWidgetType,
};
