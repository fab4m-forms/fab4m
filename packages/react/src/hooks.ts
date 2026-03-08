import { DependencyList, useContext, useMemo } from "react";
import { Form, ValidationError } from "@fab4m/fab4m";
import { FormDataContext, FormErrorsContext } from "./context";

/**
 * This hook is useful if you need to recreate your form inside of a react component.
 * This will prevent the form from being recreated unless it's necessary.
 * @param creator A function to run to generate the form.
 * @param dependencies A list of dependencies that will trigger a recreation of the form
 * if they are changed.
 * @group React API
 */
export function useForm<DataType>(
  creator: () => Form<DataType>,
  dependencies: DependencyList = [],
): Form<DataType> {
  // The form only needs to be created every time any of the inputs change.
  return useMemo(creator, dependencies);
}

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
