import { pageBreakType, pageBreak, pageBreakWidgetType } from "@fab4m/fab4m";
import { FormComponentTypePlugin, WidgetTypePlugin } from "../..";

export const pageBreakPlugin: FormComponentTypePlugin = {
  type: pageBreakType,
  init: (attributes) => pageBreak(attributes),
};

export const pageBreakWidgetPlugin: WidgetTypePlugin = {
  type: pageBreakWidgetType,
};
