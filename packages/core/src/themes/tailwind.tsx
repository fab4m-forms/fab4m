import { Theme } from "../theme";

const btnStyle = "p-2 rounded text-white cursor-pointer font-bold";
const button = `${btnStyle} bg-emerald-700 hover:bg-emerald-900`;

const secondaryButton = `${btnStyle} bg-neutral-700 hover:bg-neutral-900 dark:bg-slate-800 dark:hover:bg-slate-500`;

/**
 * A theme that integrates with the Bulma CSS framework.
 * You need to load the Bulma framework css in order for this theme to work.
 * @group Themes
 */
const tailwind: Theme = {
  name: "tailwind",
  module: "fab4m",
  classes: {
    radioWrapper: "mr-2",
    formWrapper: "",
    label: "font-bold",
    checkboxInput: "mr-1",
    checkboxWrapper: "flex cursor-pointer",
    radiosWrapper: "flex",
    description: "text-xs",
    group: "",
    formPart: "",
    componentWrapper: "mb-4",
    prefixedElementWrapper: "flex",
    elementWrapper: "",
    input:
      "border border-slate-300 h-10 rounded bg-white w-full p-2 dark:bg-slate-700 dark:border-slate-500 dark:text-slate-100",
    inputPrefixWrapper:
      "bg-slate-300 h-10 rounded -mr-1 pr-2 dark:bg-slate-800 dark:text-slate-100 dark:border-slate-500 dark:border",
    inputPrefix: "block m-auto p-2 font-bold text-s h-full",
    textarea:
      "border border-slate-300 rounded bg-white w-full p-2 dark:bg-slate-700 dark:border-slate-500 dark:text-slate-100",
    submitButton: button,
    errorList: "mt-1",
    errorItem: "text-xs text-red-500 mb-1",
    fieldset: "border p-2",
    fieldsetLegend: "m-2 font-bold",
    pager: "flex",
    pagerNext: `${button} ml-auto`,
    pagerPrevious: "text-zinc-700 hover:text-zinc-900 cursor-pointer font-bold",
    pagerComplete: `${button} ml-auto`,
    multipleItems: "mb-2",
    addItem: `${secondaryButton} text-xs`,
    multipleItem: "mb-2 is-clearfix",
    removeItem: `block cursor-pointer -mt-1 text-xs text-red-500 hover:text-red-700`,
    horizontalGroup: "",
    horizontalGroupComponentWrapper: "column",
    multipleItemWrapper: "mb-2",
    selectWrapper: "",
    select:
      "w-full p-2 bg-white h-10 border border-slate-300 dark:border-slate-500 dark:bg-slate-700 dark:text-slate-100",
    fileInput: "file-input-element",
    tags: "mb-2",
    addedTags: "mb-2 flex",
    addTagWrapper: "flex mb-2",
    addTag: `${secondaryButton} py-0 ml-2 h-8 mt-2 text-xs`,
    tag: "bg-green-500 mr-2 p-2 text-white font-bold text-xs rounded flex",
    tagLabel: "",
    removeTag: "bg-red-500 text-white px-2 ml-3 font-normal",
    labelWrapper: "font-bold mb-1",
    requiredIndicator: "ml-1 text-red-700",
    descriptionList: "mt-2 mb-2",
    descriptionItem: "flex",
    descriptionItemIcon: "mr-1",
    details: "border-slate-300 border dark:border-slate-500",
    summary:
      "bg-slate-300 p-2 px-3 font-bold dark:bg-slate-600 dark:text-slate-100",
    detailsContent: "p-4",
    autocompleteList: "",
    autocompleteListOpen:
      "p-2 block mt-2 mb-2 bg-slate-50 border-slate-300 border",
    autocompleteItem:
      "mb-2 font-bold cursor-pointer hover:bg-slate-300 p-2 text-xs border-slate-300 border bg-white rounded",
    highlightedAutocompleteItem: "bg-slate-300",
    selectedAutocompleteItem: "bg-slate-300",
    autocompleteContainer: "autocomplete-container",
  },
};

export default tailwind;
