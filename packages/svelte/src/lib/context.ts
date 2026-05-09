import { createContext } from "svelte";
import type { ValidationError } from "@fab4m/fab4m";

export function createFormDataContext() {
  return createContext<Record<string, unknown>>();
}
/**
 * The form data svelte context stores the form data so it can be accessed across the whole form.
 * @group React widget API
 */
export const [getFormDataContext, setFormDataContext] = createFormDataContext();

/**
 * The form errors svelte context stores the form errors, so it can be access across the whole form.
 * @group React widget API
 */
export const [getFormErrorsContext, setFormErrorsContext] =
  createContext<ValidationError[]>();
