import { MultipleWidgetProps, WidgetProps } from "@fab4m/fab4m";
import { ComponentType, createElement } from "react";
import { createFormRenderer } from "./formrenderer";
import { Checkbox } from "./widgets/Checkbox";
import { DateField } from "./widgets/DateField";
import { DateTimeField } from "./widgets/DateTimeField";
import { DateRangeField } from "./widgets/DateRangeField";
import { Details } from "./widgets/Details";
import { EmailField } from "./widgets/EmailField";
import { Fieldset } from "./widgets/Fieldset";
import { Group } from "./widgets/Group";
import { HiddenField } from "./widgets/HiddenField";
import { HorizontalGroup } from "./widgets/HorizontalGroup";
import { NumberField } from "./widgets/NumberField";
import { Radios } from "./widgets/Radios";
import { Select } from "./widgets/Select";
import { Submit } from "./widgets/Submit";
import { TextArea } from "./widgets/TextArea";
import { TextField } from "./widgets/TextField";
import { URLField } from "./widgets/URLField";
import { UploadField } from "./widgets/UploadField";
import { Multiple } from "./widgets/multiple/Multiple";
import { Table } from "./widgets/multiple/Table";
import { Tags } from "./widgets/multiple/Tags";
import { Content } from "./types/content";
import { FileExtensionInfo, FileSizeInfo } from "./validators/file";

const CustomWidget = (props: WidgetProps<any, any>) => {
  const Widget = props.settings as ComponentType<WidgetProps<any, any>>;
  return Widget ? createElement(Widget, props) : null;
};

const CustomMultipleWidget = (props: MultipleWidgetProps<any, any>) => {
  const Widget = props.settings as ComponentType<MultipleWidgetProps<any, any>>;
  return Widget ? createElement(Widget, props) : null;
};

export const allWidgetsRenderer = createFormRenderer({
  widgetComponents: {
    checkbox: Checkbox,
    content: Content,
    custom: CustomWidget,
    datepicker: DateField,
    dateTimePicker: DateTimeField,
    dateRangePicker: DateRangeField,
    details: Details,
    email: EmailField,
    fieldset: Fieldset,
    file: UploadField,
    group: Group,
    hidden: HiddenField,
    horizontal_group: HorizontalGroup,
    linkfield: URLField,
    numberfield: NumberField,
    radios: Radios,
    select: Select,
    submit: Submit,
    textarea: TextArea,
    textfield: TextField,
    pagebreak: () => null,
  },
  multipleWidgetComponents: {
    custom: CustomMultipleWidget,
    multiple: Multiple,
    table: Table,
    tags: Tags,
  },
  validatorComponents: {
    filesize: FileSizeInfo,
    fileExtension: FileExtensionInfo,
  },
});

export default allWidgetsRenderer;
