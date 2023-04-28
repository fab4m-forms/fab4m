import { ValidationError } from "./validator";
import { ComponentType } from "react";
import { FormComponent } from "./component";
import { MultipleWidgetSerializer, WidgetSerializer } from "./serializer";
import { Theme } from "./theme";
import { Labels } from "./form";

/**
 * Props passed to Widget React components.
 * @typeParam ValueType The type of value that this widget component handles.
 * @typeParam Settings type The type of settings this widget expects.
 * @group Widget API
 */
export interface WidgetProps<ValueType, SettingsType> {
  /**The Component that this widget is rendered for.*/
  component: FormComponent<ValueType, unknown>;
  /** The current component value. */
  value?: ValueType;
  /**
   *This event should be triggered every time the component value is updated.
   */
  onChange: (value: ValueType | undefined) => void;
  /**
   * Attributes that should be passed along to the form element in this widget.
   */
  attributes?: Record<string, unknown>;
  /**
   * A list of errors that occured in the component this widget is rendered for.
   */
  errors?: ValidationError[];
  /**
   * Widget settings provided from the widget definition.
   */
  settings: SettingsType;
  /**
   * If this widget is rendered as one of multiple items, then the index will be the
   * index in the list of values.
   */
  index?: number;
  /**
   * Hide the label for this component.
   */
  hideLabel?: boolean;
  /**
   * The labels that have been defined for this form.
   */
  labels?: Labels;
  /**
   * This is true if the form is to be rendered on the server side.
   */
  ssr: boolean;
  /**
   * The id that should be applied to the form element.
   */
  id: string;
  /**
   * The name that should be applied to the form element.
   */
  name: string;
  /**
   * The form theme that is being used.
   */
  theme: Theme;
}
/**
 * Props passed to 'Multipe Widget' React components.
 * @typeParam ValueType The type of value that this widget component handles.
 * @typeParam Settings type The type of settings this widget expects.
 * @group Widget API
 */
export interface MultipleWidgetProps<
  ValueType = unknown,
  SettingsType = unknown
> {
  /**The Component that this widget is rendered for.*/
  component: FormComponent<ValueType, unknown>;
  /** The current component value. */
  value?: ValueType[];
  /**
   *This event should be triggered every time the component value is updated.
   */
  onChange: (value: ValueType[]) => void;
  /**
   * Attributes that should be passed along to the form element in this widget.
   */
  attributes?: Record<string, unknown>;
  /**
   * Widget settings provided from the widget definition.
   */
  errors?: ValidationError[];
  /**
   * Widget settings provided from the widget definition.
   */
  settings: SettingsType;
  /**
   * This is true if the form is to be rendered on the server side.
   */
  labels?: Labels;
  /**
   * This is true if the form is to be rendered on the server side.
   */
  ssr: boolean;
  /**
   * The name that should be appled to the form element.
   */
  name: string;
  /**
   * The id that should be applied to the form element.
   */
  id: string;
  /**
   * The form theme that is being used.
   */
  theme: Theme;
}

/**
 * Defines a type of widget that can be used in components.
 * @typeParam ValueType the type of value the widget can handle.
 * @typeParam SettingsValue The type of settings this widget type will be using.
 * @group Widget API
 */
export interface WidgetType<ValueType = any, SettingsType = any> {
  /** The name of the widget. */
  name: string;
  /** A list of components that this widget supports. */
  components: string[];
  /** The widget title. */
  title: string;
  /** A serializer to serialize and unserialize the widget.*/
  serializer?: WidgetSerializer<ValueType, SettingsType>;
  /** A React component to render the widget. */
  widget: ComponentType<WidgetProps<ValueType, SettingsType>>;
  /**
   * A function that can create a widget of this type
   * @param settings the settings for this widget.
   * @return A widget of this type.
   */
  init?: (settings?: SettingsType) => Widget<ValueType, SettingsType>;
}

/**
 * Definition of a widget that can be added to a component.
 * @typeParam ValueType the type of value the widget can handle.
 * @typeParam SettingsValue The type of settings this widget type will be using.
 * @group Widget API
 */
export interface Widget<ValueType = any, SettingsType = any> {
  /** The widget type definition */
  type: WidgetType<ValueType, SettingsType>;
  /** Settings for this widget */
  settings: SettingsType;
}

/**
 * Definition of a 'multiple widget' that can be added to a component.
 * @typeParam ValueType the type of value the widget can handle.
 * @typeParam SettingsValue The type of settings this widget type will be using.
 * @group Widget API
 */
export interface MultipleWidgetType<ValueType = any, SettingsType = any> {
  /** The name of the widget. */
  name: string;
  /** The widget title. */
  title: string;
  /** A serializer to serialize and unserialize the widget.*/
  serializer?: MultipleWidgetSerializer<ValueType, SettingsType>;
  /** A React component to render the widget. */
  widget: ComponentType<MultipleWidgetProps<ValueType, SettingsType>>;
  /**
   * A function that can create a widget of this type
   * @param settings the settings for this widget.
   * @return A widget of this type.
   */
  init?: (settings?: SettingsType) => MultipleWidget<ValueType, SettingsType>;
}

/**
 * Definition of a 'multiple widget' that can be added to a component.
 * @typeParam ValueType the type of value the widget can handle.
 * @typeParam SettingsValue The type of settings this widget type will be using.
 * @group Widget API
 */
export interface MultipleWidget<ValueType = any, SettingsType = any> {
  type: MultipleWidgetType<ValueType, SettingsType>;
  settings?: SettingsType;
}

/**
 * This interface contains the minimum amount of required info
 * to create a widget.
 */
type CreateWidget<ValueType = any, SettingsType = undefined> = {
  type: Exclude<Partial<WidgetType<ValueType, SettingsType>>, "widget"> & {
    widget: ComponentType<WidgetProps<ValueType, SettingsType>>;
  };
} & (SettingsType extends undefined
  ? { settings?: SettingsType }
  : { settings: SettingsType });

/**
 * Creates a widget that can be used with a component.
 * @param args The widget definition
 * @return a Widget that is ready for use.
 * @group Widget API
 */
export function widget<ValueType = any, SettingsType = undefined>(
  args: CreateWidget<ValueType, SettingsType>
): Widget<ValueType, SettingsType> {
  return {
    ...args,
    type: {
      name: args.type.widget.displayName ?? "",
      title: args.type.widget.displayName ?? "",
      components: [],
      ...args.type,
    },
    settings: args.settings as SettingsType,
  };
}

type CreateMultipleWidget<ValueType = any, SettingsType = undefined> = {
  type: Exclude<
    Partial<MultipleWidgetType<ValueType, SettingsType>>,
    "widget"
  > & {
    widget: ComponentType<MultipleWidgetProps<ValueType, SettingsType>>;
  };
} & (SettingsType extends undefined
  ? { settings?: SettingsType }
  : { settings: SettingsType });

/**
 * Creates a 'multiple widget' that can be used with a component.
 * @param settings The widget settings.
 * @return a Widget that is ready for use.
 * @group Widget API
 */
export function multipleWidget<ValueType, SettingsType>(
  args: CreateMultipleWidget<ValueType, SettingsType>
): MultipleWidget<ValueType, SettingsType> {
  return {
    ...args,
    type: {
      name: args.type.widget.displayName ?? "",
      title: args.type.widget.displayName ?? "",
      ...args.type,
    },
  };
}
