import {
  CreateFormComponentType,
  FormComponentType,
  formComponent,
} from "../../component";
import { Widget, widget, WidgetType } from "../../widget";

/**
 * A date range value.
 * @group Components
 */
export interface DateRange {
  from: Date;
  to?: Date;
}

/**
 * Settings for the date range widget.
 * @group Components
 */
export interface DateRangeWidgetSettings {
  /** Label for the "from" input. Defaults to `"From"`. */
  fromLabel: string;
  /** Label for the "to" input. Defaults to `"To"`. */
  toLabel: string;
  /** When true the "to" input is not required. */
  optionalEndDate?: boolean;
  /** When true the inputs use `datetime-local` instead of `date`. */
  withTime?: boolean;
}

/**
 * The date field component type handles date inputs.
 * @group Components
 */
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

/**
 * The datetime field component type handles date and time inputs.
 * @group Components
 */
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

/**
 * The date range component type handles a from/to date span.
 * @group Components
 */
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
        title: "From date",
        format: "date-time",
      },
      to: {
        type: "string",
        title: "To date",
        format: "date-time",
      },
    },
    required: ["from"],
  }),
};

/**
 * Let users input a date.
 * @group Components
 */
export function dateField(attributes: CreateFormComponentType<Date>) {
  return formComponent({
    widget: datePickerWidget(),
    settings: undefined,
    type: dateFieldType,
    ...attributes,
  });
}

/**
 * Let users input a date and time.
 * @group Components
 */
export function dateTimeField(attributes: CreateFormComponentType<Date>) {
  return formComponent({
    settings: undefined,
    widget: dateTimePickerWidget(),
    type: dateTimeFieldType,
    ...attributes,
  });
}

/**
 * Let users input a date range.
 * @group Components
 */
export function dateRangeField(attributes: CreateFormComponentType<DateRange>) {
  return formComponent({
    settings: undefined,
    widget: dateRangePickerWidget(),
    type: dateRangeFieldType,
    ...attributes,
  });
}

/**
 * The date picker widget type provides a native date input.
 * @group Widgets
 */
export const datePickerWidgetType: WidgetType<Date> = {
  name: "datepicker",
  title: "Date picker",
  components: ["date"],
  init: datePickerWidget,
};

/**
 * The datetime picker widget type provides a native datetime input.
 * @group Widgets
 */
export const dateTimePickerWidgetType: WidgetType<Date> = {
  name: "dateTimePicker",
  title: "Date time picker",
  components: ["datetime"],
  init: dateTimePickerWidget,
};

/**
 * The date range picker widget type provides two native date inputs.
 * @group Widgets
 */
export const dateRangePickerWidgetType: WidgetType<
  DateRange,
  DateRangeWidgetSettings
> = {
  name: "dateRangePicker",
  title: "Date range picker",
  components: ["daterange"],
  init: dateRangePickerWidget,
};

/**
 * A native date input widget.
 * See [the date component page](/docs/components/date) for an example.
 * @group Widgets
 */
export function datePickerWidget(): Widget<Date> {
  return widget({
    type: datePickerWidgetType,
  });
}

/**
 * A native datetime input widget.
 * See [the date component page](/docs/components/date) for an example.
 * @group Widgets
 */
export function dateTimePickerWidget(): Widget<Date> {
  return widget<Date>({
    type: dateTimePickerWidgetType,
  });
}

/**
 * A native date range widget with two labeled inputs.
 * See [the date component page](/docs/components/date) for an example.
 * @group Widgets
 */
export function dateRangePickerWidget(
  settings: DateRangeWidgetSettings = { fromLabel: "From", toLabel: "To" },
) {
  return widget<DateRange, DateRangeWidgetSettings>({
    type: dateRangePickerWidgetType,
    settings,
  });
}
