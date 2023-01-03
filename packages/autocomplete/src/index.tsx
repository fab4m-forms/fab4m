import Autocomplete from "./Autocomplete";
import { Option, widget, WidgetType } from "@fab4m/fab4m";

type AutocompleteCallback<OptionType> = (
  search: string
) => Promise<Option<OptionType>[]>;

type ElementCallback<OptionType> = (
  value: OptionType,
  label: string
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
