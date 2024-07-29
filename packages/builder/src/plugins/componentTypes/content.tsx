import {
  content,
  contentType,
  contentWidgetType,
  textAreaField,
} from "@fab4m/fab4m";
import { FormComponentTypePlugin, WidgetTypePlugin } from "../..";

export const contentPlugin: FormComponentTypePlugin = {
  type: contentType,
  init: (attributes) => content(attributes, () => ""),
};

export const contentWidgetPlugin: WidgetTypePlugin<
  { content?: string },
  { content: string }
> = {
  type: contentWidgetType,
  editForm: () => ({
    content: textAreaField({ required: true }),
  }),
  settingsSchema: () => ({
    type: "object",
    properties: {
      content: {
        type: "string",
      },
    },
    required: ["content"],
  }),
};
