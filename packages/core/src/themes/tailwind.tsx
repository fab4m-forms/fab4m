import { Theme } from "../theme";

export interface TailwindSettings {
  primaryBg: string;
  secondaryBg: string;
  inputBorder: string;
  inputBg: string;
  inputText: string;
  inputHeight: string;
  text: string;
  labelText: string;
}

const defaultSettings: TailwindSettings = {
  primaryBg: "bg-neutral-900 hover:bg-neutral-700",
  secondaryBg: "bg-neutral-400 hover:bg-neutral-600",
  inputBorder: "border border-slate-300 dark:border-slate-500",
  inputBg: "bg-white dark:bg-slate-700",
  inputText: "text-black dark:text-slate-100",
  inputHeight: "h-10",
  text: "dark:text-white",
  labelText: "dark:text-white",
};

/**
 * Create a new tailwind theme and customize some base settings to make it
 * easy to tailor the style to your liking.
 */
export function createTailwindTheme(args: {
  settings: Partial<TailwindSettings>;
  name?: string;
  module?: string;
}): Theme {
  const s = { ...defaultSettings, ...args.settings };
  const btnStyle = "p-2 rounded text-white cursor-pointer font-bold";
  const button = `${btnStyle} ${s.primaryBg} justify-center text-sm`;
  const secondaryButton = `${btnStyle} ${s.secondaryBg} justify-center text-xs`;
  return {
    name: args.name ?? "tailwind",
    module: args.module ?? "fab4m",
    classes: {
      radioWrapper: "mr-2",
      formWrapper: "",
      label: `font-bold ${s.labelText}`,
      labelWrapper: "font-bold mb-1",
      checkboxInput: "mr-1",
      checkboxWrapper: `flex cursor-pointer ${s.text}`,
      radiosWrapper: "flex",
      description: `text-xs ${s.text}`,
      group: "",
      formPart: "",
      componentWrapper: "mb-4 group-[.table]:mb-0",
      prefixedElementWrapper: "flex",
      elementWrapper: "",
      input: `${s.inputBorder} ${s.inputHeight} ${s.inputBg} ${s.inputText} rounded w-full p-2`,
      inputPrefixWrapper:
        "bg-slate-300 h-10 rounded -mr-1 pr-2 dark:bg-slate-800 dark:text-slate-100 dark:border-slate-500 dark:border",
      inputPrefix: "block m-auto p-2 font-bold text-s h-full",
      textarea:
        "border border-slate-300 rounded bg-white w-full p-2 dark:bg-slate-700 dark:border-slate-500 dark:text-slate-100",
      submitButton: button,
      errorList: "mt-1",
      errorItem: "text-xs text-red-500 mb-1",
      fieldset: "border p-2",
      fieldsetLegend: "m-2 font-bold ${s.text}",
      pager: "flex",
      pagerNext: `${button} ml-auto`,
      pagerPrevious:
        "text-zinc-700 hover:text-zinc-900 cursor-pointer font-bold",
      pagerComplete: `${button} ml-auto`,
      multipleItems: "mb-2",
      addItem: `${secondaryButton} text-xs`,
      multipleItem: "mb-2 is-clearfix",
      removeItem:
        "block cursor-pointer -mt-1 text-xs text-red-500 hover:text-red-700",
      horizontalGroup: "flex",
      horizontalGroupComponentWrapper: "mr-2",
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
      table: "table-auto w-full mb-4 group table",
      tr: "odd:bg-slate-200 odd:dark:bg-slate-900 bg-slate-300 dark:bg-slate-800",
      headTr: "bg-slate-300 dark:bg-slate-800",
      operationsTh: "p-2 align-middle text-center",
      td: "p-2 align-middle text-center",
      th: "p-2 align-middle text-center",
      operationsTd: "p-2 align-middle text-center w-4",
    },
  };
}

/**
 * A theme that integrates with the Tailwind CSS framework.
 * You need to load the Tailwind framework css in order for this theme to work.
 * @group Themes
 */
const tailwind = createTailwindTheme({ settings: {} });

export default tailwind;
