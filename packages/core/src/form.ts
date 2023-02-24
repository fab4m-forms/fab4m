/**
 * @module Form API
 * @group Form API
 */

import { createContext, useContext } from "react";
import {
  FormComponent,
  FormComponentWithName,
  validateComponent,
} from "./component";
import { filterComponents } from "./rule";
import { Theme } from "./theme";
import { defaultTheme } from ".";
import { ValidationError } from "./validator";
/**
 * This interface defines the labels that are used throughout the form.
 * @group Form API
 */
export interface Labels {
  /** Used as the text for the submit button. */
  submit: string;
  /** Usedas the text on the next button on multipage forms.*/
  next: string;
  /** Used as the text on the previous button on multipage forms.*/
  previous: string;
  /** Use as the complete text on the complete button on multipage forms.*/
  complete: string;
  /** Used for the "Required" label on required form components. */
  required: string;
}

/**
 * Base interface for forms.
 * An instance of the form class can be created from this interface.
 * @group Form API
 */
export interface FormDefinition {
  /** The form theme that should be used to render this form. */
  theme: Theme;
  /** A list of Form components that this form contains. */
  components: FormComponentWithName[];
  /** The labels that should be used in the form. */
  labels?: Partial<Labels>;
  /** The form description is used as the description in the JSON schema. */
  description?: string;
  /** The form title is used as the title in the JSON schema, and also labels the form. */
  title?: string;
}

/**
 * @param e the form submission event.
 * @param data The data that was submitted. The data is fully validated.
 * @typeParam DataType the type of data that is submitted.
 * @group Form API
 */
export type SubmitCallback<DataType> = (
  e: React.FormEvent<HTMLFormElement>,
  data: DataType
) => void;

/**
 * @param data The changed data.
 * @typeParam DataType the type of data that is submitted.
 * @group Form API
 */
export type DataChangeCallback<DataType> = (data: Partial<DataType>) => void;

/**
 * @param part the part number that is being validated
 * @param data The data that was submitted. This includes the data for the current part and all
 * previous parts.
 * @param e The form submission event.
 * @typeParam DataType the type of data that is submitted.
 * @group Form API
 */
export type PartValidatorCallback<DataType> = (
  part: number,
  data: Partial<DataType>,
  e: React.FormEvent<HTMLFormElement>
) => Promise<ValidationError[] | void>;

/**
 * @param name The name of the component that was changed.
 * @param value The value of the component.
 * @typeParam DataType the type of data that is submitted.
 * @group Form API
 */
export type ComponentChangeCallback<DataType> = (
  name: keyof DataType,
  value: unknown
) => void;

/**
 * An object containing component definitions matching a data type.
 * @typeParam DataType the type of data the components should match.
 * @group Form API
 */
export type Components<DataType> = {
  [Property in keyof DataType]?: NonNullable<DataType[Property]> extends Array<
    infer Type
  >
    ? FormComponent<Type, unknown>
    : FormComponent<NonNullable<DataType[Property]>, unknown>;
};

/**
 * This is the main form class that is used to represent forms in Fab4m. It can be instantiated
 * directly, but usually it's created through the {@link createForm} helper function.
 *
 * @typeParam DataType The type of data that this form will handle.
 * @group Form API
 */
export class Form<DataType = Record<string, any>> implements FormDefinition {
  public theme: Theme;
  public components: FormComponentWithName[];
  public labels?: Partial<Labels>;
  public description?: string;
  public title?: string;
  public submitListeners: SubmitCallback<DataType>[] = [];
  public afterSubmitListeners: SubmitCallback<DataType>[] = [];
  public dataChangeListeners: DataChangeCallback<DataType>[] = [];
  public componentChangeListeners: ComponentChangeCallback<DataType>[] = [];
  public partValidators: PartValidatorCallback<DataType>[] = [];

  /**
   * Determine if this form has any submit listeners attached to it.
   */
  public hasSubmitListeners() {
    return this.submitListeners.length > 0;
  }

  /**
   * @param theme The theme that should be used in this form.
   * @param components An object with form components that should be included in the form.
   */
  public constructor(
    theme: Theme,
    components: Components<DataType> = {},
    settings?: Partial<FormDefinition>
  ) {
    this.theme = theme;
    this.components = [];
    for (const name in components) {
      const component = components[name];
      if (component) {
        this.components.push({ name, ...component });
      }
    }
    this.title = settings?.title;
    this.description = settings?.description;
    this.labels = settings?.labels;
  }

  /**
   * Add a new component to this form.
   * This method is chainable so you can add multiple components:
   * ```javascript
   * form.add(component1).add(component2);
   * ```
   */
  add(component: FormComponent) {
    if (component.name) {
      if (
        this.components.findIndex(
          (candidate) => candidate.name === component.name
        ) !== -1
      ) {
        throw new Error("A component with the same name already exists.");
      }
      this.components.push({ ...component, name: component.name });
    } else {
      throw new Error("The component must have a name");
    }
    return this;
  }

  /**
   * Add a submit event listener to the form. The event will only be triggered
   * once the form is fully validated. This method is chainable.
   *
   * @param callback The event callback that will be called when a form is submitted.
   * @param append We remove the existing event listeners by default to avoid problems when
   * registering listeners in React components. Set this to true to append your listener to the existing
   * list of listeners rather than replacing the existing one.
   */
  onSubmit(callback: SubmitCallback<DataType>, append?: boolean) {
    if (!append) {
      this.removeSubmitListeners();
    }
    this.submitListeners.push(callback);
    return this;
  }

  /**
   * Add an after submit event listener to the form. This event will be triggered after the submit events
   * have been called.
   * @param callback The event callback that will be called after the form has been submitted.
   * @param append We remove the existing event listeners by default to avoid problems when
   * registering listeners in React components. Set this to true to append your listener to the existing
   * list of listeners rather than replacing the existing one.
   */
  onAfterSubmit(callback: SubmitCallback<DataType>, append?: boolean) {
    if (!append) {
      this.removeAfterSubmitListeners();
    }
    this.afterSubmitListeners.push(callback);
    return this;
  }

  /**
   * Add a data change event listener to the form. This event will be triggered every time the form data
   * is changed.
   * @param callback The event callback that will be called when data changes in the form.
   * @param append We remove the existing event listeners by default to avoid problems when
   * registering listeners in React components. Set this to true to append your listener to the existing
   * list of listeners rather than replacing the existing one.
   */
  onDataChange(callback: DataChangeCallback<DataType>, append?: boolean) {
    if (!append) {
      this.removeDataChangeListeners();
    }
    this.dataChangeListeners.push(callback);
    return this;
  }

  /**
   * Add a component change listener to the form. This event will be triggered every time a component in
   * the form changes.
   * @param callback The event callback that will be called when a component changes.
   * @param append We remove the existing event listeners by default to avoid problems when
   * registering listeners in React components. Set this to true to append your listener to the existing
   * list of listeners rather than replacing the existing one.
   */
  onComponentChange(
    callback: ComponentChangeCallback<DataType>,
    append?: boolean
  ) {
    if (!append) {
      this.removeComponentChangeListeners();
    }
    this.componentChangeListeners.push(callback);
    return this;
  }

  /**
   * Add a part validation listener to the form. This event will be triggered every time
   * the user of the form tries to proceed to the next part,
   * or when the form is submitted, if it's the last page.
   * The callback should return any validation errors that occurred.
   * The submission will be prevented if you provide any errors.
   * @param callback The event callback that will be called
   * whenever the user tries to go to the next page.
   * @param append We remove the existing event listeners by default to avoid problems when
   * registering listeners in React components. Set this to true to append your listener to the existing
   * list of listeners rather than replacing the existing one.
   */
  onPartValidate(callback: PartValidatorCallback<DataType>, append?: boolean) {
    if (!append) {
      this.removePartValidateListeners();
    }
    this.partValidators.push(callback);
    return this;
  }

  /**
   * Remove all event listeners.
   */
  removeEventListeners() {
    this.submitListeners = [];
    this.dataChangeListeners = [];
    this.componentChangeListeners = [];
    this.afterSubmitListeners = [];
  }

  /**
   * Remove all submit event listeners.
   */
  removeSubmitListeners() {
    this.submitListeners = [];
  }

  /**
   * Remove all data change listeners.
   */
  removeDataChangeListeners() {
    this.dataChangeListeners = [];
  }

  /**
   * Remove all after submit event listeners.
   */
  removeAfterSubmitListeners() {
    this.afterSubmitListeners = [];
  }

  /**
   * Remove all component change listeners.
   */
  removeComponentChangeListeners() {
    this.componentChangeListeners = [];
  }

  /**
   * Remove all part validation listeners.
   */
  removePartValidateListeners() {
    this.partValidators = [];
  }

  /**
   * Trigger the validate part event.
   */
  triggerValidatePart: PartValidatorCallback<DataType> = async (
    part,
    data,
    e
  ) => {
    let errors: ValidationError[] = [];
    for (const partValidator of this.partValidators) {
      const partErrors = await partValidator(part, data, e);
      if (partErrors) {
        errors = [...errors, ...partErrors];
      }
    }
    return errors;
  };

  /**
   * Trigger the submit event.
   * @param e the Form event.
   * @param form The form to trigger the event for.
   */
  triggerSubmit: SubmitCallback<DataType> = (e, form) => {
    this.submitListeners.forEach((listener) => listener(e, form));
  };
  /**
   * Trigger the after submit event.
   */
  triggerAfterSubmit: SubmitCallback<DataType> = (e, form) => {
    this.afterSubmitListeners.forEach((listener) => listener(e, form));
  };
  /**
   * Trigger the change data event.
   */
  triggerChangeData: DataChangeCallback<DataType> = (
    data: Partial<DataType>
  ) => {
    this.dataChangeListeners.forEach((listener) => listener(data));
  };

  /**
   * Trigger the change component event.
   */
  triggerChangeComponent: ComponentChangeCallback<DataType> = (name, value) => {
    this.componentChangeListeners.forEach((listener) => listener(name, value));
  };
}

/**
 * Create a new fab4m form.
 * @param theme The theme that should be used in this form.
 * @param components An object with form components that should be included in the form.
 * @param settings Any settings that should be set on the form.
 * @group Form API
 */
export function createForm<DataType = Record<string, any>>(
  components: Components<DataType> = {},
  settings: Partial<FormDefinition> = {},
  theme: Theme = defaultTheme
): Form<DataType> {
  return new Form<DataType>(theme, components, settings);
}

/**
 * Takes any instance of a form definition and turn into a full-blown Form instance.
 * @param definition A form definition.
 * @group Form API
 */
export function formFromDefinition<DataType = Record<string, any>>(
  definition: FormDefinition
) {
  const form = new Form<DataType>(definition.theme, {}, { ...definition });
  for (const component of definition.components) {
    form.add(component);
  }
  return form;
}

/**
 * A form part is a list of form components that will be rendered together.
 */
type FormPart = FormComponentWithName[];

/**
 * Get all the form parts from a form.
 * This function finds all the page break components and return a list of form parts
 * @param form The form to get the parts for.
 * @group Form API
 */
export function formParts(form: FormDefinition): FormPart[] {
  const parts: FormPart[] = [[]];
  let partIndex = 0;
  for (const component of form.components) {
    parts[partIndex].push(component);
    if (component.type.splitsForm) {
      parts.push([]);
      partIndex++;
    }
  }
  return parts;
}

/**
 * Given a list of form parts, the current part and the currently submitted data,
 * get the next part of the form.
 * @return the next part of the form, or -1 if there are no more parts of this form.
 * @group Form API
 */
export function getNextPart(
  parts: FormPart[],
  part: number,
  data: Record<string, unknown>
): number {
  const nextPart = part + 1;
  if (parts.length - 1 < nextPart) {
    return -1;
  }
  if (filterComponents(parts[nextPart], data, true).length > 0) {
    return nextPart;
  }
  return getNextPart(parts, nextPart, data);
}

/**
 * Given a list of form parts, the current part and the currently submitted data,
 * get the previous part of the form.
 * @return the previous part of the form, or -1 if there are no more parts of this form.
 * @group Form API
 */
export function getPrevPart(
  parts: FormPart[],
  part: number,
  data: Record<string, unknown>
): number {
  const prevPart = part - 1;
  if (prevPart < 0) {
    return -1;
  }
  if (filterComponents(parts[prevPart], data, true).length > 0) {
    return prevPart;
  }
  return getPrevPart(parts, prevPart, data);
}

/**
 * The form data react context stores the form data so it can be accessed across the whole form.
 * @group React widget API
 */
export const FormDataContext = createContext({} as Record<string, unknown>);

/**
 * The form errros react context stores the form errors, so it can be access across the whole form.
 * @group React widget API
 */
export const FormErrorsContext = createContext([] as ValidationError[]);

/**
 * This hook can be used by form widgets to access all of the form data.
 *  @group React widget API
 */
export function useFormData(): Record<string, unknown> {
  return useContext(FormDataContext);
}

/**
 * This hook can be used by form widgets to access all of the form errors.
 *  @group React widget API
 */
export function useFormErrors(): ValidationError[] {
  return useContext(FormErrorsContext);
}

/**
 * Find all errors related to a certain json path.
 * @internal
 */
export function componentErrors(
  path: string,
  errors: ValidationError[]
): ValidationError[] {
  return errors
    .filter((e) => e.path.startsWith(path))
    .map((e) => {
      return { ...e, path: e.path.substr(path.length) };
    });
}

async function validateComponents(
  components: FormComponentWithName[],
  data: unknown
) {
  let errors: ValidationError[] = [];
  for (const component of filterComponents(
    components,
    data as Record<string, unknown>
  )) {
    const componentErrors = await validateComponent(
      `/${component.name}`,
      component,
      data as Record<string, unknown>
    );
    if (componentErrors.length > 0 && component.name) {
      errors = [...errors, ...componentErrors];
    }
  }
  return errors;
}

/**
 * Validate a full form based on the given data.
 * @param form the form that should be used for validation.
 * @param data The data to validate.
 * @return a list of validation errors.
 * @group Form API
 */
export async function validateForm(form: Form, data: unknown) {
  return validateComponents(form.components, data);
}

/**
 * Validate a certain form part.
 * @param form the form where the part exists.
 * @param part the part number to validate
 * @param data the data to validate
 * @param event The form event that triggered the validation.
 * @internal
 */
export async function validateFormPart(
  form: Form,
  part: number,
  data: unknown,
  event: React.FormEvent<HTMLFormElement>
) {
  const parts = formParts(form);
  if (part > parts.length - 1) {
    throw new Error("Invalid part provided");
  }
  let errors = await validateComponents(parts[part], data);
  if (errors.length === 0) {
    const callbackErrors = await form.triggerValidatePart(
      part,
      data as Record<string, unknown>,
      event
    );
    if (callbackErrors && callbackErrors.length > 0) {
      errors = [...errors, ...callbackErrors];
    }
  }
  return errors;
}
