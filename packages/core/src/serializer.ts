import {
  FormComponentsList,
  FormComponentVariant,
  FormDefinition,
  formFromDefinition,
  Labels,
} from "./form";
import {
  ComponentDataType,
  FormComponentType,
  FormComponent,
  FormComponentWithName,
} from "./component";
import {
  MultipleWidget,
  MultipleWidgetType,
  WidgetType,
  Widget,
} from "./widget";
import {
  generatePartSchemas,
  generateSchema,
  Schema,
  schemaMessages,
} from "./schema";
import { Theme } from "./theme";
import { Validator, ValidatorType } from "./validator";
import { RuleGroupType, AnyRule } from "./rule";

/**
 * A library of serializer plugins that can be used to serialize
 * and deserailize a form.
 * @group Serializer API
 */
export interface SerializerPlugins {
  types: Record<string, FormComponentType<unknown | undefined>>;
  themes: Record<string, Theme>;
  widgets: Record<string, WidgetType>;
  multipleWidgets: Record<string, MultipleWidgetType>;
  validators: Record<string, ValidatorType>;
  ruleGroups: Record<string, RuleGroupType>;
}

export type SerializedRule = [string, SerializedValidator];

/**
 * A serialized version of a rule.
 * @group Serializer API
 */
export interface SerializedRuleGroup {
  type: string;
  rules: Array<SerializedRuleGroup | SerializedRule>;
}

/**
 * A serialized version of a widget.
 * @group Serializer API
 */
export interface SerializedWidget {
  type: string;
  settings?: unknown;
}

interface SerializedValidator {
  settings: unknown;
  type: string;
}

/**
 * A serialized version of a component.
 * @group Serializer API
 */
export type SerializedComponent = Omit<
  FormComponent,
  | "widget"
  | "multipleWidget"
  | "type"
  | "validators"
  | "settings"
  | "rules"
  | "components"
> & {
  type: string;
  splitsForm: boolean;
  widget: SerializedWidget;
  multipleWidget?: SerializedWidget;
  settings?: unknown;
  components?: SerializedComponentsList;
  validators: SerializedValidator[];
  rules: Array<SerializedRuleGroup | SerializedRule>;
  dataType?: ComponentDataType;
};

/**
 * A serialized version of a form component.
 * @group Serializer API
 */
export interface SerializedVariant {
  rule?: SerializedRule | SerializedRuleGroup;
  component: SerializedComponent;
}

/**
 * The list of serialized components or component variants.
 * @group Serializer API
 */
export type SerializedComponentsList = Array<
  SerializedComponent | SerializedVariant[]
>;

/**
 * A component serializer is used to serialize and unserialize a component.
 * A serialized component can be represented as JSON data.
 * @group Serializer API
 */
export interface ComponentSerializer<SettingsType> {
  /**
   * Serialize a form component to a value that can be represented as JSON data.
   * @param component The component to serialize.
   * @return the serialized component.
   */
  serialize: (component: FormComponent) => SerializedComponent;
  /**
   * Unserialize a serialized component into a component that cana be used in a form.
   * @param component The component to unserialize.
   * @param type The componenent type definition.
   * @param validators A list of available validators.
   * @param rules A list of available rules.
   * @param plugins The serializer plugin library
   * @return the unserialized component.
   */
  unserialize: (
    component: SerializedComponent,
    componentType: FormComponentType<SettingsType>,
    validators: Validator[],
    rules: AnyRule[],
    plugins: SerializerPlugins,
  ) => FormComponentWithName | null;
}

/**
 * A widget serializer is used to serialize and unserialize a widget.
 * @group Serializer API
 */
export interface WidgetSerializer<ValueType, SettingsType> {
  /**
   * Serialize a widget into a value that can be represented as JSON data.
   * @param widget The widget to serialize.
   * @return The serialized widget.
   */
  serialize: (widget: Widget<ValueType, SettingsType>) => SerializedWidget;
  /**
   * Unserialize a serialized widget into a widget that can be used on a component.
   * @param widget The widget to unserialize.
   * @param plugins A serializer plugin library.
   * @return An unserialized widget.
   */
  unserialize: (
    widget: SerializedWidget,
    plugins: SerializerPlugins,
  ) => Widget<ValueType, SettingsType> | null;
}
/**
 * A 'multiple widget' serializer is used to serialize and unserialize a 'multiple widget'.
 * @group Serializer API
 */
export interface MultipleWidgetSerializer<ValueType, SettingsType> {
  /**
   * Serialize a widget into a value that can be represented as JSON data.
   * @param widget The widget to serialize.
   * @return The serialized widget.
   */
  serialize: (
    widget: MultipleWidget<ValueType, SettingsType>,
  ) => SerializedWidget;
  /**
   * Unserialize a serialized widget into a widget that can be used on a component.
   * @param widget The widget to unserialize.
   * @param plugins A serializer plugin library.
   * @return An unserialized widget.
   */
  unserialize: (
    widget: SerializedWidget,
    plugins: SerializerPlugins,
  ) => MultipleWidget<ValueType, SettingsType> | null;
}

/**
 * A representation of a form that can be safely represented as JSON data.
 * @group Serializer API
 */
export interface SerializedForm {
  /** The name of the theme as a string. */
  theme: string;
  /** The JSON schema for the full form. **/
  schema: Schema;
  /** The labels that should be used in the form. */
  labels?: Partial<Labels>;
  /** A list of schemas for each form part. **/
  schemaParts: Schema[];
  /** Schema error messages are error message overrides that can be used instead of the JSON Schema errors. **/
  schemaMessages: Record<string, string>;
  /** A list of serialized for components or component variants. */
  components: SerializedComponentsList;
}

/**
 * Serialize a rule
 * @param rule The rule or a rule group to serialize.
 * @return The serialized representation of the rule.
 * @group Serializer API
 */
export function serializeRule(
  rule: AnyRule,
): SerializedRule | SerializedRuleGroup {
  if (Array.isArray(rule)) {
    return [rule[0], { settings: rule[1].settings, type: rule[1].type.name }];
  }
  return {
    type: rule.type.name,
    rules: rule.rules.map(serializeRule),
  };
}

export function serializeComponentListItem(
  item: FormComponent | FormComponentVariant[],
): SerializedComponent | SerializedVariant[] {
  if (Array.isArray(item)) {
    return item.map((item): SerializedVariant => {
      return {
        component: serializeComponent(item.component),
        rule: item.rule ? serializeRule(item.rule) : undefined,
      };
    });
  }
  return serializeComponent(item);
}

/**
 * Serialize a component
 * @param component The component to serialize
 * @return The serialized representation of the component.
 * @group Serializer API
 */
export function serializeComponent(
  component: FormComponent,
): SerializedComponent {
  if (component.type.serializer) {
    return component.type.serializer.serialize(component);
  }
  return {
    ...component,
    type: component.type.name,
    dataType: component.type.dataType,
    splitsForm: !!component.type.splitsForm,
    widget: serializeWidget(component.widget),
    multipleWidget: component.multipleWidget
      ? serializeMultipleWidget(component.multipleWidget)
      : undefined,
    components: component.components
      ? component.components.map(serializeComponentListItem)
      : undefined,
    validators: component.validators.map((v) => ({
      settings: v.settings,
      type: v.type.name,
    })),
    rules: component.rules.map(serializeRule),
  };
}

/**
 * Serialize a form into an object that can be represented as JSON data.
 * The serialized version of the form also contains the JSON Schema for the form
 * and the JSON Schema for each part.
 * @group Serializer API
 */
export function serialize(form: FormDefinition): SerializedForm {
  const components = form.components.map(serializeComponentListItem);
  return {
    labels: form.labels,
    theme: form.theme.name,
    schema: generateSchema(form),
    schemaParts: generatePartSchemas(form),
    schemaMessages: schemaMessages(form),
    components,
  };
}

/**
 * Unserialize a serialized form into a working form definition.
 * @param form The serialized form to unserialize.
 * @param types A list of available component types that can be used in the form.
 *  Any component that has a type that isn't provided in the list will be removed from unserialized form.
 * @param themes A list of available themes that could be used for the form. If the theme of
 * the serialized form isn't in this list, an error will be thrown.
 * @param widgets A list of available widget types that can be used in the form.
 * Any component that has a widget type that isn't provided in the list will be removed from the unserialized form.
 * @param multipleWidgets A list of available multiple widget types that can be used in the form.
 * Any component that has a multiple widget type that isn't provided in the list will be removed from the unserialized form.
 * @param rules A list of available rule types that can be used in the form.
 * Any component that has a rule type that isn't provided in the list will be removed from the unserialized form.
 * @param validators A list of available validator types that can be used in the form.
 * Any component that has a validator type that isn't provided in the list will be removed from the unserialized form.
 * @param ruleGroups A list of available rule groupo types that can be used in the form.
 * Any component that has a rule group type that isn't provided in the list will be removed from the unserial ized form.
 * @return The unserialized form.
 * @group Serializer API
 */
export function unserialize(
  form: SerializedForm,
  types: FormComponentType[] = [],
  themes: Theme[] = [],
  widgets: WidgetType[] = [],
  multipleWidgets: MultipleWidgetType[] = [],
  validators: ValidatorType[] = [],
  ruleGroups: RuleGroupType[] = [],
): FormDefinition {
  const typeMap: Record<string, FormComponentType> = {};
  const widgetMap: Record<string, WidgetType> = {};
  const multipleWidgetMap: Record<string, MultipleWidgetType> = {};
  const validatorMap: Record<string, ValidatorType> = {};
  const themeMap: Record<string, Theme> = {};
  const ruleGroupMap: Record<string, RuleGroupType> = {};
  for (const type of types) {
    typeMap[type.name] = type;
  }
  for (const widget of widgets) {
    widgetMap[widget.name] = widget;
  }
  for (const multipleWidget of multipleWidgets) {
    multipleWidgetMap[multipleWidget.name] = multipleWidget;
  }

  for (const validator of validators) {
    validatorMap[validator.name] = validator;
  }
  for (const theme of themes) {
    themeMap[theme.name] = theme;
  }
  for (const group of ruleGroups) {
    ruleGroupMap[group.name] = group;
  }

  const components: FormComponentsList = [];
  const plugins: SerializerPlugins = {
    types: typeMap,
    themes: themeMap,
    widgets: widgetMap,
    validators: validatorMap,
    ruleGroups: ruleGroupMap,
    multipleWidgets: multipleWidgetMap,
  };
  for (const component of form.components) {
    const unserializedComponent = unserializeComponentListItem(
      component,
      plugins,
    );
    if (unserializedComponent) {
      components.push(unserializedComponent);
    }
  }
  const theme = themes.find((theme) => theme.name === form.theme);
  if (!theme) {
    throw new Error("Could not find theme " + form.theme);
  }
  return formFromDefinition({
    ...form,
    theme,
    components,
  });
}

export function unserializeComponentListItem(
  item: SerializedComponent | SerializedVariant[],
  plugins: SerializerPlugins,
): FormComponentWithName | FormComponentVariant[] | null {
  if (Array.isArray(item)) {
    const variants: FormComponentVariant[] = [];
    for (const variant of item) {
      let rule = undefined;
      if (variant.rule) {
        rule = unserializeRule(variant.rule, plugins);
        if (!rule) {
          continue;
        }
      }
      const component = unserializeComponent(variant.component, plugins);
      if (!component) {
        continue;
      }
      variants.push({
        rule,
        component,
      });
    }
    return variants;
  }
  return unserializeComponent(item, plugins) ?? null;
}

/**
 * Unserialize a serialized component.
 * @param component The serialized version of the component.
 * @param plugins A serialized plugin libarary.
 * @return The unserialized version of the widget or null if any type was missing from the plugin library.
 * @group Serializer API
 */
export function unserializeComponent(
  component: SerializedComponent,
  plugins: SerializerPlugins,
): FormComponentWithName | null {
  if (plugins.types[component.type]) {
    const widget = unserializeWidget(component.widget, plugins);
    if (!widget) {
      return null;
    }
    const multipleWidget = component.multipleWidget
      ? unserializeMultipleWidget(component.multipleWidget, plugins)
      : undefined;
    const validators: Validator[] = [];
    for (const validator of component.validators) {
      if (plugins.validators[validator.type]) {
        validators.push({
          type: plugins.validators[validator.type],
          settings: validator.settings,
        });
      }
    }
    const rules: Array<AnyRule> = [];
    for (const serializedRule of component.rules) {
      const rule = unserializeRule(serializedRule, plugins);
      if (rule) {
        rules.push(rule);
      }
    }
    const componentType = plugins.types[component.type];
    if (componentType.serializer) {
      return componentType.serializer.unserialize(
        component,
        componentType,
        validators,
        rules,
        plugins,
      );
    }
    let components;
    if (component.components) {
      components = [];
      for (const serializedComponent of component.components) {
        const unserializedComponent = unserializeComponentListItem(
          serializedComponent,
          plugins,
        );
        if (unserializedComponent) {
          components.push(unserializedComponent);
        }
      }
    }
    return {
      ...component,
      type: componentType,
      name: component.name ?? "",
      components,
      widget,
      multipleWidget: multipleWidget ?? undefined,
      settings: component.settings,
      validators,
      rules,
    };
  }
  return null;
}

/**
 * Serialize a widget
 * @param widget The widget to serialize
 * @return The serialized version of the widget.
 * @group Serializer API
 */
export function serializeWidget(widget: Widget): SerializedWidget {
  if (widget.type.serializer) {
    return widget.type.serializer.serialize(widget);
  }
  return {
    type: widget.type.name,
    settings: widget.settings,
  };
}

/**
 * Serialize a 'multiple widget'
 * @param widget The widget to serialize
 * @return The serialized version of the widget.
 * @group Serializer API
 */
export function serializeMultipleWidget(
  widget: MultipleWidget,
): SerializedWidget {
  if (widget.type.serializer) {
    return widget.type.serializer.serialize(widget);
  }
  return {
    type: widget.type.name,
    settings: widget.settings,
  };
}

/**
 * Unserialize a serialized widget.
 * @param widget The serialized version of the widget.
 * @param plugins A serializer plugin libarary.
 * @return The unserialized version of the widget or null if any type was missing from the plugin library.
 * @group Serializer API
 */
export function unserializeWidget(
  widget: SerializedWidget,
  plugins: SerializerPlugins,
): Widget | null {
  if (!plugins.widgets[widget.type]) {
    return null;
  }
  const widgetType = plugins.widgets[widget.type];
  if (widgetType.serializer) {
    return widgetType.serializer.unserialize(widget, plugins);
  }
  return {
    type: widgetType,
    settings: widget.settings,
  };
}

/**
 * Unserialize a serialized 'multiple widget'.
 * @param widget The serialized version of the widget.
 * @param plugins A serialized plugin libarary.
 * @return The unserialized version of the widget or null if any type was missing from the plugin library.
 * @group Serializer API
 */
export function unserializeMultipleWidget(
  widget: SerializedWidget,
  plugins: SerializerPlugins,
): MultipleWidget | null {
  if (!plugins.multipleWidgets[widget.type]) {
    return null;
  }
  const widgetType = plugins.multipleWidgets[widget.type];
  if (widgetType.serializer) {
    return widgetType.serializer.unserialize(widget, plugins);
  }
  return {
    type: widgetType,
    settings: widget.settings,
  };
}

/**
 * Unserialize a serialized rule.
 * @param rule The serialized version of the rule.
 * @param plugins A serializer plugin libarary.
 * @return The unserialized version of the widget or null if any type was missing from the plugin library.
 * @group Serializer API
 */
export function unserializeRule(
  rule: SerializedRule | SerializedRuleGroup,
  plugins: SerializerPlugins,
): AnyRule | null {
  if (Array.isArray(rule) && plugins.validators[rule[1].type]) {
    return [
      rule[0],
      { type: plugins.validators[rule[1].type], settings: rule[1].settings },
    ];
  } else if (!Array.isArray(rule) && plugins.ruleGroups[rule.type]) {
    const rules = [];
    for (const serializedRule of rule.rules) {
      const unserializedRule = unserializeRule(serializedRule, plugins);
      if (unserializedRule) {
        rules.push(unserializedRule);
      }
    }
    return {
      type: plugins.ruleGroups[rule.type],
      rules: rules,
    };
  }
  return null;
}
