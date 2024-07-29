import { textAreaField } from "@fab4m/fab4m";
import {
  AutocompleteSettings,
  autocompleteWidgetType,
  Option,
} from "@fab4m/autocomplete";
import { WidgetTypePlugin } from "../..";
import t from "../../translations";

function optionsToText(options: Option<string>[]) {
  return options
    .map((option) => (Array.isArray(option) ? option.join("|") : option))
    .join("\n");
}

function textToOptions(text: string): Option<string>[] {
  return text.split("\n").map((row) => {
    if (row.includes("|")) {
      const split = row.split("|");
      return [split[0], split[1], undefined];
    }
    return row;
  });
}

export const autocompleteWidgetPlugin: WidgetTypePlugin<
  AutocompleteSettings<string, undefined>,
  { items: string }
> = {
  type: autocompleteWidgetType,
  formData: (settings) => {
    return {
      items: Array.isArray(settings.items) ? optionsToText(settings.items) : "",
    };
  },
  settingsFromForm: ({ items }) => {
    const settings: AutocompleteSettings<string, undefined> = {
      items: textToOptions(items),
    };
    return settings;
  },
  editForm: () => ({
    items: textAreaField({ required: true, label: t("autocomplete.options") }),
  }),
  settingsSchema: () => ({
    type: "object",
    properties: {
      items: {
        type: "array",
        items: [{ type: "string" }, { type: "string" }],
        minItems: 2,
        maxItems: 2,
      },
    },
    required: ["items"],
  }),
};
