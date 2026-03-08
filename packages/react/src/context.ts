import { createContext } from "react";
import { ValidationError } from "@fab4m/fab4m";

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
