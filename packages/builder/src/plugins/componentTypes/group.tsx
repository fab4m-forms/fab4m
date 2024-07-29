import {
  group,
  groupType,
  groupWidgetType,
  detailsWidgetType,
  DetailsSettings,
  booleanField,
  fieldsetWidgetType,
  horizontalGroupWidgetType,
} from "@fab4m/fab4m";
import { FormComponentTypePlugin, WidgetTypePlugin } from "../..";
import t from "../../translations";

export const groupPlugin: FormComponentTypePlugin = {
  type: groupType,
  init: (attributes) => group(attributes, {}),
};

export const groupWidgetPlugin: WidgetTypePlugin = {
  type: groupWidgetType,
};

export const fieldsetWidgetPlugin: WidgetTypePlugin = {
  type: fieldsetWidgetType,
};

export const detailsWidgetPlugin: WidgetTypePlugin<
  DetailsSettings<Record<string, unknown>>,
  { open?: boolean }
> = {
  type: detailsWidgetType,
  editForm: () => ({
    open: booleanField({ label: t("open") }),
  }),
  settingsSchema: () => ({
    type: "object",
    properties: {
      open: { type: "boolean" },
    },
  }),
};

export const horizontalGroupWidgetPlugin: WidgetTypePlugin = {
  type: horizontalGroupWidgetType,
};
