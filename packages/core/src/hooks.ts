import { useMemo } from "react";
import { DependencyList } from "react";
import { Form } from "./form";

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
  dependencies?: DependencyList,
): Form<DataType> {
  // The form only needs to be created every time any of the inputs change.
  return useMemo(creator, dependencies);
}
