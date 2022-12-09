import { TagsClasses } from "./widgets/multiple";

/**
 * Definition of all available theme class names.
 * These names are used throughout fab4m whenever a class is applied.
 * @group Theme API
 */
interface BaseThemeClasses {
  /** This class is used on a div that wraps the whole form. */
  formWrapper: string;
  /** This class is applied to the wrapper around a component.*/
  componentWrapper: string;
  /**This class wraps the form element when a prefix is provided. For instance, a phone number input might have a area code prefix*/
  prefixedElementWrapper: string;
  /** This class wraps the form element, for example the input field. */
  elementWrapper: string;
  /** This class is applied to input fields. */
  input: string;
  /** This class is applied to labels */
  label: string;
  /** This class is applied to submit buttons. */
  submitButton: string;
  /** This class is applied to the wrapper for checkboxes. */
  checkboxWrapper: string;
  /** This class is applied to the checkbox input element. */
  checkboxInput: string;
  /** This class is applied to the prefix for an input element.*/
  inputPrefix: string;
  /** This class is applied to the error item for a component.*/
  errorItem: string;
  /** This class is applied to the list of component validation errors.*/
  errorList: string;
  /** This class is applied to the form pager for multipage forms.*/
  pager: string;
  /** This class is applied to the next button for multipage forms.*/
  pagerNext: string;
  /** This class is applied to the previous button for multipage forms.*/
  pagerPrevious: string;
  /** This class is applied to the form part wrapper.*/
  formPart: string;
  /**This class is appled to the group component wrapper*/
  group: string;
  /**This class is applied to the wrappar around components that have multiple values.*/
  multipleItems: string;
  /**This class is applied to the wrappar around the radios in a radios widget.*/
  radiosWrapper: string;
  /**This class is applied to each item for components that have multiple values.*/
  multipleItem: string;
  /** This class is applied to the add item button for multiple components.*/
  addItem: string;
  /** This class is applied to the remove item button for multiple components.*/
  removeItem: string;
  /** This class is applied to the wrapper around a group using the horizontal group widget.*/
  horizontalGroup: string;
  /** This class is applied to the wrapper around each component in a horizontal group.*/
  horizontalGroupComponentWrapper: string;
  /** This class is applied to the wrapper around a select item.*/
  selectWrapper: string;
  /** This class is applied to the indicator that a field is required.*/
  requiredIndicator: string;
  /** Any extra classes can be added for custom widgets */
  [name: string]: string;
}

/**
 * All theme classes.
 * @group Theme API
 */
export type ThemeClasses = BaseThemeClasses & TagsClasses;

/**
 * A theme definition.
 * @group Theme API
 */
export interface Theme {
  name: string;
  stylesheet?: string;
  module: string;
  classes: ThemeClasses;
}

/**
 * A set of default theme classes that can be used as a basis for any theme.
 * @group Theme API
 */
export const defaultThemeClasses: ThemeClasses = {
  formWrapper: "form-wrapper",
  componentWrapper: "component",
  prefixedElementWrapper: "prefixed-form-element",
  elementWrapper: "form-element",
  input: "input",
  inputPrefix: "input-prefix",
  textarea: "textarea",
  fileInput: "file-input",
  label: "label",
  checkboxWrapper: "checkbox",
  radioWrapper: "radio",
  radiosWrapper: "radios",
  checkboxInput: "checkbox-element",
  groupedElementWrapper: "form-element-grouped",
  submitButton: "submit",
  errorItem: "error-item",
  errorList: "error-list",
  pager: "pager",
  pagerNext: "pager-next",
  pagerPrevious: "pager-previous",
  pagerComplete: "pager-complete",
  formPart: "form-part",
  group: "group",
  multipleItems: "multiple-items",
  multipleItem: "multiple-item",
  removeItem: "remove-item-button",
  addItem: "add-item-button",
  fieldset: "fieldset",
  fieldsetLegend: "legend",
  description: "description",
  descriptionList: "description-list",
  descriptionOk: "description-ok",
  descriptionItem: "description-item",
  descriptionItemIcon: "description-item-icon",
  descriptionItemPlaceholder: "description-item-placeholder",
  horizontalGroup: "horizontal-group",
  horizontalGroupComponentWrapper: "horizontal-group-component-wrapper",
  selectWrapper: "select-wrapper",
  tags: "tags",
  tag: "tag",
  tagLabel: "tag-label",
  addTagWrapper: "add-tag-wrapper",
  addTag: "add-tag",
  removeTag: "remove-tag",
  addedTags: "added-tags",
  requiredIndicator: "required-indicator",
  labelWrapper: "label-wrapper",
};
