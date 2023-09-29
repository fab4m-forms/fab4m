import UploadField from "./UploadField";
import {
  FormComponentType,
  FormComponent,
  CreateFormComponentType,
  formComponent,
} from "../../component";
import { Widget, widget, WidgetType } from "../../widget";

interface FileUploadAdapter {
  upload: (file: File) => Promise<string>;
}

interface FileUploadSettings {
  adapter?: FileUploadAdapter;
}

/**
 * A component type that allows for files to be added to the form.
 * @group Components
 */
export const fileFieldType: FormComponentType<FileUploadSettings> = {
  name: "file",
  title: "File upload",
  description: "Upload a file",
  formProps: (props) => ({
    ...props,
    encType: "multipart/form-data",
  }),
};

/**
 * Create a file field component that can be added to the form.
 * @group Components
 */
export function fileField(
  attributes: CreateFormComponentType<File, FileUploadSettings>,
): FormComponent<File, FileUploadSettings> {
  return formComponent({
    widget: fileUploadWidget(),
    settings: {},
    ...attributes,
    type: fileFieldType,
  });
}

/**
 * The file upload widget type provides a file input field.
 * @group Widgets
 */
export const fileUploadWidgetType: WidgetType<File, undefined> = {
  name: "file",
  title: "Upload field",
  components: ["file"],
  widget: UploadField,
  init: fileUploadWidget,
};

/**
 * Provides a file input field.
 *
 * See [the file component page](/docs/components/file) for an example of how it works.
 * @group Widgets
 */
export function fileUploadWidget(): Widget<File, undefined> {
  return widget({
    type: fileUploadWidgetType,
    settings: undefined,
  });
}

export * from "./validators";
