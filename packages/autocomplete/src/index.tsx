import Autocomplete from "./Autocomplete";
import { widget, WidgetType } from "@fab4m/fab4m";
export type Option<OptionsType, Context = Record<string, unknown>> =
  | [string, OptionsType, Context?]
  | OptionsType;
type AutocompleteCallback<OptionType> = (
  search: string
) => Promise<Option<OptionType>[]>;

type ElementCallback<OptionType, Context = Record<string, unknown>> = (
  value: OptionType,
  label: string,
  context?: Context
) => React.ReactNode;

export interface AutocompleteSettings<OptionType> {
  items: Option<OptionType>[] | AutocompleteCallback<OptionType>;
  itemElement?: ElementCallback<OptionType>;
}

export const autocompleteWidgetType: WidgetType<
  any,
  AutocompleteSettings<any>
> = {
  name: "autocomplete",
  title: "Autocomplete",
  components: ["text", "integer", "float"],
  widget: Autocomplete,
  init: autocompleteWidget,
};

export function autocompleteWidget<OptionType>(
  options?: AutocompleteSettings<OptionType>
) {
  return widget<OptionType, AutocompleteSettings<OptionType>>({
    type: autocompleteWidgetType,
    settings: options ? options : { items: [] },
  });
}
