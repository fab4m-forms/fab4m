import {
  FormComponentType,
  Components,
  WidgetType,
  ValidatorType,
  FormComponent,
  SchemaProperty,
} from "@fab4m/fab4m";

export type Plugin<SettingsType, SettingsFormData> = {
  editForm?: () => Components<SettingsFormData>;
  settingsFromForm?: (data: SettingsFormData) => SettingsType;
  formData?: (settings: SettingsType) => SettingsFormData;
  settingsSchema?: () => SchemaProperty;
};

export type FormComponentTypePlugin<
  SettingsType = unknown,
  SettingsFormData = Record<string, unknown>,
> = Plugin<SettingsType, SettingsFormData> & {
  type: FormComponentType<SettingsType>;
  init: (
    attributes: Partial<FormComponent> & { name: string },
  ) => FormComponent;
};

export type WidgetTypePlugin<
  SettingsType = unknown,
  SettingsFormData = Record<string, unknown>,
> = Plugin<SettingsType, SettingsFormData> & {
  type: WidgetType;
};

export type ValidatorTypePlugin<
  SettingsType = unknown,
  SettingsFormData = unknown,
> = Plugin<SettingsType, SettingsFormData> & {
  component?: () => FormComponent<SettingsFormData>;
  type: ValidatorType;
};

export type Plugins = {
  types: FormComponentTypePlugin[];
  widgets: WidgetTypePlugin[];
  validators: ValidatorTypePlugin[];
};
export { allPlugins } from "./allPlugins";
export * from "./plugins/componentTypes/text";
export * from "./components/FormComponents";
export * from "./components/NewComponent";
export * from "./components/FormBuilderProvider";
export * from "./components/EditFormComponent";
export * from "./components/ComponentForm";
export { useFormBuilderActions, useFormBuilderForm } from "./context";
