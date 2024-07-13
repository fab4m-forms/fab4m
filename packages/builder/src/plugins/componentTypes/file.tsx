import {
  fileField,
  fileFieldType,
  fileUploadWidgetType,
  FileUploadSettings,
} from "@fab4m/fab4m";
import { FormComponentTypePlugin, WidgetTypePlugin } from "../..";

export const fileFieldPlugin: FormComponentTypePlugin<FileUploadSettings> = {
  type: fileFieldType,
  init: (attributes) => fileField(attributes),
};

export const fileUploadWidgetPlugin: WidgetTypePlugin<undefined> = {
  type: fileUploadWidgetType,
};
