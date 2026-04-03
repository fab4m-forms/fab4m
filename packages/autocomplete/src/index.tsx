import { widget, WidgetType } from "@fab4m/fab4m";
import type { ReactNode } from "react";

export { default as Autocomplete } from "./Autocomplete";

export type Option<OptionsType, Context = any> =
  | [string, OptionsType, Context]
  | OptionsType;

type AutocompleteCallback<OptionType, Context> = (
  search: string,
) => Promise<Option<OptionType, Context>[]>;

type ElementCallback<OptionType, Context = undefined> = (
  value: OptionType,
  label: string,
  context: Context,
) => ReactNode;

export interface AutocompleteSettings<OptionType, Context> {
  items:
    | Option<OptionType, Context>[]
    | AutocompleteCallback<OptionType, Context>;
  itemElement?: ElementCallback<OptionType, Context>;
}

export const autocompleteWidgetType: WidgetType<
  any,
  AutocompleteSettings<any, any>
> = {
  name: "autocomplete",
  title: "Autocomplete",
  components: ["text", "integer", "float"],
  init: autocompleteWidget,
};

export function autocompleteWidget<OptionType, Context = undefined>(
  options?: AutocompleteSettings<OptionType, Context>,
) {
  return widget<OptionType, AutocompleteSettings<OptionType, Context>>({
    type: autocompleteWidgetType,
    settings: options ?? { items: [] },
  });
}
