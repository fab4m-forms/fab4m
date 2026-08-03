import { type Component } from "svelte";
import type { WidgetProps } from "@fab4m/fab4m";
import TextArea from "./widgets/TextArea.svelte";
import TextField from "./widgets/TextField.svelte";
import UploadField from "./widgets/UploadField.svelte";
import Group from "./widgets/Group.svelte";
import URLField from "./widgets/URLField.svelte";
import DateField from "./widgets/DateField.svelte";
import DateTimeField from "./widgets/DateTimeField.svelte";
import DateRangeField from "./widgets/DateRangeField.svelte";

export const widgetComponents: Record<string, Component<WidgetProps<any, any>>> = {
  textfield: TextField,
  textarea: TextArea,
  file: UploadField,
  group: Group,
  linkfield: URLField,
  datepicker: DateField,
  dateTimePicker: DateTimeField,
  dateRangePicker: DateRangeField,
};
