/**
 * Group API definitions and helpers.
 * @module Component API
 */
import { FormHTMLAttributes } from "react";
import { FormComponentsList } from "./form";
import { AnyRule, filterComponents } from "./rule";
import { SchemaProperty } from "./schema";
import { ComponentSerializer } from "./serializer";
import { checkValidators, Validator, ValidationError } from "./validator";
import { MultipleWidget, Widget } from "./widget";

/**
 * The allowed data types a form component could have. Used to determine the type in the JSON Schema.
 * @group Component API
 */
export type ComponentDataType =
  | "string"
  | "integer"
  | "float"
  | "object"
  | "boolean"
  | "array";

/**
 * Defines a type of component that can be used in Fab4m forms.
 *
 * @typeParam SettingsType
 *    The datatype used for the component settings this component uses.
 * @group Component API
 */
export interface FormComponentType<SettingsType = unknown> {
  /** The name of the component type. */
  name: string;
  /** The title of the component type. This can be used when this component is displayed somewhre in a UI. */
  title: string;
  /** The description of the component type. This can be used when this component is displayed somewhre in a UI. */
  description?: string;
  serializer?: ComponentSerializer<SettingsType>;
  /**
   * In some cases where you use complex data types in your configuration,
   * you might need to define a component serializer to serialize and unserialize
   * the settings of this form component.
   * @param component The component instance to generate the schema for.
   * @param defaultSchema The default schema that is automatically generated by fab4m.
   */
  schema?: (
    component: FormComponent<unknown, SettingsType>,
    defaultSchema?: SchemaProperty,
  ) => SchemaProperty;
  /**
   * The datatype this component should use in the JSON Schema. Defaults to string.
   */
  dataType?: ComponentDataType;
  /**
   * If this is true, then the form will be split after this component and continue on a
   * new page.
   */
  splitsForm?: boolean;
  /**
   * This method allows you to add more properties to the top level form that this component belongs to.
   * For instance, if you have a file input field you might need to specify that
   * the form should have the encType multipart/formdata.
   */
  formProps?: (
    props: FormHTMLAttributes<HTMLFormElement>,
    component: FormComponent<unknown, SettingsType>,
  ) => FormHTMLAttributes<HTMLFormElement>;
  /**
   * This allows you to specify a custom error message for this component or parts of it.
   */
  schemaErrorMessages?: (
    component: FormComponent<unknown, SettingsType>,
  ) => Record<string, () => string>;
}

/**
 * A definition of a form component that can be used inside of a form.
 * @typeParam ValueType the type of data value that this component manages.
 * @typeParam SettingsType The type of settings that is used for this component.
 * @group Component API
 */
export interface FormComponent<ValueType = any, SettingsType = any> {
  /**
   * A reference to the component type definiton for this component. You usually
   * don't have to set this yourself, the component creator function will provide it for you.
   */
  readonly type: FormComponentType<SettingsType>;
  /**
   * If this is true, then the data of this component will be an array of multiple
   * values.
   * Check the guide on [rendering forms](/docs/guide/define-a-form#handling-multiple-data) for more information.
   */
  readonly multiple?: boolean;
  /**
   * The name for this component. This will be used as the name on the form HTML element in the form.
   */
  readonly name?: string;
  /**
   * The label for this component. Normally this will be displayed in a HTML label tag.
   */
  label?: string;
  /**
   * A descriptive text for this component. This can be small help text to help the user understand
   * what to input into the form.
   */
  description?: string;
  /**
   * Extra attributes to add to the form tag. For instance, if you want to add an extra aria tag to the form element, you can add it here.
   */
  attributes?: Record<string, string | boolean | number>;
  /**
   * The widget to use for this component. The component will be rendered using this widget.
   */
  widget: Widget<ValueType, any>;  
  /**
   * The widget to use for this component when it's set to be multiple.
   */
  multipleWidget?: MultipleWidget<ValueType, any>;  
  /**
   * Component-specific settings. Check each component to know what settings are available.
   */
  settings: SettingsType;
  /**
   * The minimum number of items that needs to be provided for this component when it's set to be multiple.
   */
  minItems?: number;
  /**
   * The maximum number of items that needs to be provided for this component when it's set to be multiple.
   */
  maxItems?: number;
  /**
   * Group components can have subcomponents that are rendered as part of the component. They should be provided here as a list of components.
   */
  components?: FormComponentsList;
  /**
   * A list of validators to determine if the data inputted into this component is valid. See the [/docs/guide/validators](Validators guide) for more info.
   */
  validators: Validator[];
  /**
   * A list of rules to determine if this component should be visible or not.
   * See the [/docs/guide/rules](Rules guide) for more info.
   */
  rules: AnyRule[];
  /**
   * If set, then the form can't be submitted without any data for this component.
   */
  required: boolean;
  /**
   * Disables this input component if set to true.
   */
  disabled?: boolean;
}

/**
 * @inheritDoc FormComponent
 * @group Component API
 */
export type FormComponentWithName = Omit<FormComponent, "name"> & {
  name: string;
};

/**
 * @inheritDoc FormComponent
 * @typeParam ValueType the type of data value that this component manages.
 * @typeParam SettingsType The type of settings that is used for this component.
 */
export type CreateFormComponentType<
  ValueType,
  SettingsType = undefined,
> = Partial<Omit<FormComponent<ValueType, SettingsType>, "type">>;

const defaultComponentDefinition = {
  validators: [],
  rules: [],
  required: false,
  multipleWidget: undefined,
};

/**
 * Create a form component definition.
 * @typeParam ValueType the type of data value that this component manages.
 * @typeParam SettingsType The type of settings that is used for this component.
 * @group Component API
 */
export function formComponent<ValueType, SettingsType = unknown>(
  definition: Omit<
    FormComponent<ValueType, SettingsType>,
    "validators" | "required" | "rules"
  > &
    Partial<
      Pick<
        FormComponent<ValueType, SettingsType>,
        "validators" | "required" | "rules"
      >
    >,
): FormComponent<ValueType, SettingsType> {
  return {
    ...defaultComponentDefinition,
    ...definition,
  };
}

/**
 * Generate an object with all the attributes that should be applied to a component.
 * @internal
 */
export function attributes(
  component: FormComponent<unknown, unknown>,
): Record<string, string | boolean | number> {
  let attributes = {};
  for (const validator of component.validators) {
    if (validator.type.attributes) {
      attributes = {
        ...attributes,
        ...validator.type.attributes(validator),
      };
    }
  }
  return attributes;
}

/**
 * Validate the provided data for a specific component.
 * @param path the JSON path to where the component sits within the data.
 * @param component The form component to validate.
 * @param data The data where the component data is included.
 * @group Component API
 */
export async function validateComponent(
  path: string,
  component: FormComponent,
  data: Record<string, unknown>,
): Promise<ValidationError[]> {
  let errors = [];
  if (!component.name) {
    return [];
  }
  if (component.required && typeof data[component.name] === "undefined") {
    errors.push({
      path,
      message: `${component.label ?? component.name} is required.`,
    });
  }

  if (component.multiple) {
    const items = data[component.name];
    if (Array.isArray(items) && items.length > 0) {
      if (items.length === 0 && component.required) {
        errors.push({
          path,
          message: `${component.label ?? component.name} is required.`,
        });
      }
      if (component.minItems && items.length < component.minItems) {
        errors.push({
          path,
          message: `${component.label ?? component.name} must have at least ${
            component.minItems
          } items.`,
        });
      }
      if (component.maxItems && items.length > component.maxItems) {
        errors.push({
          path,
          message: `${component.label ?? component.name} can only have up to ${
            component.maxItems
          } items.`,
        });
      }
      let i = 0;
      for (const item of items) {
        if (component.components) {
          for (const child of filterComponents(component.components, data)) {
            errors = [
              ...errors,
              ...(await validateComponent(
                `${path}/${i}/${child.name}`,
                child,
                item as Record<string, unknown>,
              )),
            ];
          }
        }
        errors = [
          ...errors,
          ...(await checkValidators(`${path}/${i}`, item, component)),
        ];
        i++;
      }
    }
  } else {
    if (component.components && data[component.name]) {
      for (const child of filterComponents(component.components, data)) {
        errors = [
          ...errors,
          ...(await validateComponent(
            `${path}/${child.name}`,
            child,
            data[component.name] as Record<string, unknown>,
          )),
        ];
      }
    }
    const validatorErrors = await checkValidators(
      path,
      data[component.name],
      component,
    );
    errors = [...errors, ...validatorErrors];
  }
  return errors;
}
