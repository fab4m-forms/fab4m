import { Form } from "./form";
import { ValidationError } from "./validator";
/**
 * Properties for all form views.
 * @group React API
 */
export interface FormViewProps {
  /**The form to render*/
  form: Form<any>; // eslint-disable-line
  /**The form data*/
  data: unknown;
  /**
   * Extra data is rendered as input type="hidden" elements inside of the form.
   * This is useful if you need to add things like a CSRF validation token.
   */
  extra?: Record<string, string | number>;
  /**
   * The part of the form to render.
   */
  part?: number;
  /**
   * A list of validation errors to render inside of the form.
   */
  errors?: ValidationError[];
  /**
   * This event is triggered when the form is submitted and validation errors occur.
   */
  errorsChanged?: (errors: ValidationError[]) => void;
  /**
   * Optimize this form for server side rendering.
   */
  ssr?: boolean;
  /**
   * The form action. This is set as the action of the form element.
   */
  action?: string;
  /**
   * Setting this to true will prevent the form from being submitted.
   */
  disabled?: boolean;
  /**
   * Setting this to true will hide the form submit button.
   */
  hideSubmit?: boolean;
  /**
   *  Set the class name for the form.
   */
  className?: string;
  /**
   * Add a prefix to all form ids.
   */
  idPrefix?: string;
}
