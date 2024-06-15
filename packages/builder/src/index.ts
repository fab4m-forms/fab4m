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
  init: (name: string) => FormComponent;
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

export * from "./components/FormComponents";
export * from "./components/FormBuilderProvider";
export {
  useFormBuilderActions,
  useFormBuilderForm,
  FormBuilderActions,
} from "./context";
