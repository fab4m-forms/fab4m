import { DatePicker, DateTimePicker, DateRangePicker } from "./DatePicker";
import { Locale } from "date-fns";
import {
  FormComponentType,
  CreateFormComponentType,
  formComponent,
  widget,
  WidgetType,
  Widget,
  WidgetSerializer,
} from "@fab4m/fab4m";
import { ReactDatePickerProps } from "react-datepicker";

export interface DateRange {
  from: Date;
  to?: Date;
}

let locales: Locale[] = [];
export function setLocales(availableLocales: Locale[]) {
  locales = availableLocales;
}

export const dateFieldType: FormComponentType = {
  name: "date",
  title: "Date",
  description: "Input a date",
  dataType: "string",
  schema: (component, defaultSchema) => ({
    ...defaultSchema,
    type: "string",
    format: "date",
  }),
};

export const dateTimeFieldType: FormComponentType = {
  name: "datetime",
  title: "Date time",
  description: "Input date and time",
  dataType: "string",
  schema: (component, defaultSchema) => ({
    ...defaultSchema,
    type: "string",
    format: "date-time",
  }),
};

export const dateRangeFieldType: FormComponentType = {
  name: "daterange",
  title: "Date range",
  description: "A timespan",
  dataType: "object",
  schema: (component) => ({
    type: "object",
    title: component.name,
    properties: {
      from: {
        type: "string",
        title: "To date",
        format: "date-time",
      },
      to: {
        type: "string",
        title: "From date",
        format: "date-time",
      },
    },
    required: ["from"],
  }),
};

export function dateField(attributes: CreateFormComponentType<Date>) {
  return formComponent({
    widget: datePickerWidget(),
    settings: undefined,
    type: dateFieldType,
    ...attributes,
  });
}

export function dateTimeField(attributes: CreateFormComponentType<Date>) {
  return formComponent({
    settings: undefined,
    widget: dateTimePickerWidget(),
    type: dateTimeFieldType,
    ...attributes,
  });
}

export function dateRangeField(attributes: CreateFormComponentType<DateRange>) {
  return formComponent({
    settings: undefined,
    widget: dateRangePickerWidget(),
    type: dateRangeFieldType,
    ...attributes,
  });
}

export interface DateFieldWidgetSettings {
  locale?: Locale;
  locales?: Locale[];
  useBrowserLocale?: boolean;
  format?: string;
  datePickerProps?:
    | ReactDatePickerProps
    | ((value?: Date) => ReactDatePickerProps);
}

interface SerializedDateFieldSettings {
  locale?: string;
  locales?: string[];
  useBrowserLocale?: boolean;
  format?: string;
}

export interface DateRangeWidgetSettings extends DateFieldWidgetSettings {
  fromLabel: string;
  toLabel: string;
  optionalEndDate?: boolean;
  withTime?: boolean;
}

interface SerializedDateRangeSettings extends SerializedDateFieldSettings {
  fromLabel: string;
  toLabel: string;
  optionalEndDate?: boolean;
  withTime?: boolean;
}

function serializeDateSettings(settings: DateFieldWidgetSettings) {
  return {
    locale: settings.locale ? settings.locale.code : undefined,
    locales: settings.locales?.map((l) => l.code),
    useBrowserLocale: settings.useBrowserLocale,
    format: settings.format,
  };
}

function unserializeDateSettings(settings: SerializedDateFieldSettings) {
  return {
    locales,
    locale: settings.locale
      ? locales.find((locale) => locale.code === settings.locale)
      : undefined,
    useBrowserLocale: settings.useBrowserLocale,
    format: settings.format,
  };
}

function dateSettingsSerializer(
  type: WidgetType<Date, DateFieldWidgetSettings>,
): WidgetSerializer<Date, DateFieldWidgetSettings> {
  return {
    serialize(widget) {
      return {
        type: type.name,
        settings: serializeDateSettings(widget.settings),
      };
    },
    unserialize: (serialized) => {
      const settings = unserializeDateSettings(
        serialized.settings as SerializedDateFieldSettings,
      );
      return {
        type,
        settings,
      };
    },
  };
}

const dateRangeSettingsSerializer: WidgetSerializer<
  DateRange,
  DateRangeWidgetSettings
> = {
  serialize(widget) {
    return {
      type: "dateRangePicker",
      settings: {
        ...widget.settings,
        ...serializeDateSettings(widget.settings),
      },
    };
  },
  unserialize: (serialized) => {
    const settings = unserializeDateSettings(
      serialized.settings as SerializedDateFieldSettings,
    );
    return {
      type: dateRangePickerWidgetType,
      settings: {
        ...(serialized.settings as SerializedDateRangeSettings),
        ...settings,
      },
    };
  },
};

export const datePickerWidgetType: WidgetType<Date, DateFieldWidgetSettings> = {
  name: "datepicker",
  title: "Date picker",
  components: ["date"],
  widget: DatePicker,
  init: datePickerWidget,
};

datePickerWidgetType.serializer = dateSettingsSerializer(datePickerWidgetType);

export function datePickerWidget(
  settings: DateFieldWidgetSettings = {},
): Widget<Date, DateFieldWidgetSettings> {
  return widget({
    type: datePickerWidgetType,
    settings,
  });
}
export const dateTimePickerWidgetType: WidgetType<
  Date,
  DateFieldWidgetSettings
> = {
  name: "dateTimePicker",
  title: "Date picker",
  components: ["datetime"],
  widget: DateTimePicker,
  init: dateTimePickerWidget,
};

dateTimePickerWidgetType.serializer = dateSettingsSerializer(
  dateTimePickerWidgetType,
);

export function dateTimePickerWidget(settings: DateFieldWidgetSettings = {}) {
  return widget<Date, DateFieldWidgetSettings>({
    type: dateTimePickerWidgetType,
    settings,
  });
}

export const dateRangePickerWidgetType: WidgetType<
  DateRange,
  DateRangeWidgetSettings
> = {
  name: "dateRangePicker",
  title: "Date picker",
  components: ["daterange"],
  widget: DateRangePicker,
  serializer: dateRangeSettingsSerializer,
  init: dateRangePickerWidget,
};

export function dateRangePickerWidget(
  settings: DateRangeWidgetSettings = { fromLabel: "From", toLabel: "To" },
) {
  return widget<DateRange, DateRangeWidgetSettings>({
    type: dateRangePickerWidgetType,
    settings,
  });
}
