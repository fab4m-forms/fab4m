import {
  selectWidgetType,
  radiosWidgetType,
  Option,
  Options,
  SelectWidgetSettings,
  textField,
  textAreaField,
  SchemaProperty,
} from "@fab4m/fab4m";
import { WidgetTypePlugin } from "../..";
import t from "../../translations";

const optionsSchema: SchemaProperty = {
  type: "object",
  properties: {
    options: {
      type: "string",
    },
  },
  required: ["options"],
};
function optionsToText(options: Options<string> | Option<string>[]) {
  return options
    .map((option) => (Array.isArray(option) ? option.join("|") : option))
    .join("\n");
}

export function textToOptions(text: string): Option<string>[] {
  return text.split("\n").map((row) => {
    if (row.includes("|")) {
      const split = row.split("|");
      return [split[0], split[1]];
    }
    return row;
  });
}

export const selectWidgetPlugin: WidgetTypePlugin<
  SelectWidgetSettings<string>,
  { options: string; notSelectedLabel?: string }
> = {
  type: selectWidgetType,
  formData: (settings) => {
    return {
      options: optionsToText(settings.options),
      notSelectedLabel: settings.notSelectedLabel,
    };
  },
  settingsFromForm: ({ options, notSelectedLabel }) => {
    const settings: SelectWidgetSettings<string> = {
      options: textToOptions(options),
      notSelectedLabel,
    };
    return settings;
  },
  editForm: () => ({
    options: textAreaField({ required: true, label: t("options.options") }),
    notSelectedLabel: textField({ label: t("options.notSelectedLabel") }),
  }),
  settingsSchema: () => optionsSchema,
};

export const radiosWidgetPlugin: WidgetTypePlugin<
  Options<string>,
  { options: string }
> = {
  type: radiosWidgetType,
  formData: (settings) => {
    return { options: optionsToText(settings) };
  },
  settingsFromForm: ({ options }) => {
    return textToOptions(options);
  },
  editForm: () => ({
    options: textAreaField({ required: true, label: t("options.options") }),
  }),
  settingsSchema: () => optionsSchema,
};
