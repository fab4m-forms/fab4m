import {
  FormComponentType,
  Components,
  WidgetType,
  ValidatorType,
  FormComponent,
  SchemaProperty,
} from "@fab4m/fab4m";
import styles from "./styles";

export type Plugin<SettingsType, SettingsFormData> = {
  editForm?: () => Components<SettingsFormData>;
  settingsFromForm?: (data: SettingsFormData) => SettingsType;
  formData?: (settings: SettingsType) => SettingsFormData;
  settingsSchema?: () => SchemaProperty;
};

export type FormComponentTypePlugin<
  SettingsType = any,
  SettingsFormData = any,
> = Plugin<SettingsType, SettingsFormData> & {
  type: FormComponentType<SettingsType>;
  init: (
    attributes: Partial<FormComponent> & { name: string },
  ) => FormComponent;
};

export type WidgetTypePlugin<
  SettingsType = any,
  SettingsFormData = any,
> = Plugin<SettingsType, SettingsFormData> & {
  type: WidgetType;
};

export type ValidatorTypePlugin<
  SettingsType = any,
  SettingsFormData = any,
> = Omit<Plugin<SettingsType, SettingsFormData>, "editForm"> & {
  component?: () => FormComponent<SettingsFormData>;
  type: ValidatorType;
};

export type Plugins = {
  types: FormComponentTypePlugin[];
  widgets: WidgetTypePlugin[];
  validators: ValidatorTypePlugin[];
};
export { styles };
export { allPlugins } from "./allPlugins";
export * from "./plugins/componentTypes/file";
export * from "./plugins/componentTypes/boolean";
export * from "./plugins/componentTypes/text";
export * from "./plugins/componentTypes/content";
//export * from "./plugins/componentTypes/date";
export * from "./plugins/componentTypes/email";
export * from "./plugins/componentTypes/group";
export * from "./plugins/componentTypes/number";
export * from "./plugins/componentTypes/pagebreak";
export * from "./plugins/componentTypes/url";
export * from "./plugins/widgets/autocomplete";
export * from "./plugins/widgets/options";
export * from "./plugins/validators/exists";
export * from "./plugins/validators/length";
export * from "./plugins/validators/numbers";
export * from "./plugins/validators/values";
export * from "./components/FormComponents";
export * from "./components/NewComponent";
export * from "./components/FormBuilderProvider";
export * from "./components/EditFormComponent";
export * from "./components/ComponentForm";
export * from "./components/FormPreview";
export * from "./defaultIcons";

export { useFormBuilderActions, useFormBuilderForm } from "./context";
