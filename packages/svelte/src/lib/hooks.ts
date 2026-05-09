import type { ValidationError } from "@fab4m/fab4m";
import { getFormDataContext, getFormErrorsContext } from "./context.js";

/**
 * This hook can be used by form widgets to access all of the form data.
 *  @group Svelte widget API
 */
export function useFormData(): Record<string, unknown> {
  return getFormDataContext();
}

/**
 * This hook can be used by form widgets to access all of the form errors.
 *  @group Svelte widget API
 */
export function useFormErrors(): ValidationError[] {
  return getFormErrorsContext();
}
