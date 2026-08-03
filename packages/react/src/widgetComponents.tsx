import { DateRangeField } from "./widgets/DateRangeField";
import { DateField } from "./widgets/DateField";
import { DateTimeField } from "./widgets/DateTimeField";
import { TextArea } from "./widgets/TextArea";
import { TextField } from "./widgets/TextField";
import * as React from "react";
import { UploadField } from "./widgets/UploadField";
import { Group } from "./widgets/Group";
import { URLField } from "./widgets/URLField";

export const widgetComponents: Record<string, React.FC<any>> = {
  textfield: TextField,
  textarea: TextArea,
  file: UploadField,
  group: Group,
  linkfield: URLField,
  datepicker: DateField,
  dateTimePicker: DateTimeField,
  dateRangePicker: DateRangeField,
};
