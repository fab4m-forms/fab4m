import { defaultThemeClasses, Theme } from "../theme";

/**
 * A theme that integrates with the Bulma CSS framework.
 * You need to load the Bulma framework css in order for this theme to work.
 * @group Themes
 */
const bulma: Theme = {
  name: "bulma",
  module: "fab4m",
  classes: {
    ...defaultThemeClasses,
    formPart: "form-part block",
    componentWrapper: "field",
    prefixedElementWrapper: "field has-addons",
    elementWrapper: "control",
    input: "input",
    inputPrefixWrapper: "control",
    inputPrefix: "button is-static",
    submitButton: "button is-primary",
    errorList: "help is-danger",
    fieldset: "box fieldset-box",
    fieldsetLegend: "title is-6 m-0",
    pager: "pagination",
    pagerNext: "pagination-next",
    pagerPrevious: "pagination-next has-background-primary has-text-white",
    pagerComplete: "pagination-next has-background-primary has-text-white",
    multipleItems: "mb-2",
    addItem: "button is-success is-small",
    multipleItem: "mb-2 is-clearfix",
    removeItem: "button is-danger is-small",
    horizontalGroup: "columns",
    horizontalGroupComponentWrapper: "column",
    multipleItemWrapper: "mb-2",
    selectWrapper: "select",
    fileInput: "file-input-element",
    tags: "control",
    addedTags: "block tags",
    addTagWrapper: "is-flex mb-2",
    addTag: "button is-success ml-2",
    tag: "tag is-light is-medium",
    removeTag: "delete",
    labelWrapper: "label-wrapper",
    requiredIndicator: "ml-2 has-text-danger is-sr-only",
    descriptionList: "mt-2 mb-2",
    descriptionItem: "is-flex",
    descriptionItemIcon: "mr-1",
    details: "panel",
    summary: "panel-heading",
    detailsContent: "p-4",
    autocompleteList: "card mt-1",
    autocompleteListOpen: "is-block",
    autocompleteItem: "p-2",
    highlightedAutocompleteItem: "has-background-primary-light",
    selectedAutocompleteItem: "is-bold",
    autocompleteContainer: "autocomplete-container",
    table: "table is-fullwidth",
    rowOperations: "flex is-justify-content-center",
  },
};

export default bulma;
