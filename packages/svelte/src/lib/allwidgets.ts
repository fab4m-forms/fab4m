import type { MultipleWidgetProps, WidgetProps } from "@fab4m/fab4m";
import { type Component } from "svelte";
import { createFormRenderer } from "./formrenderer.js";
import Checkbox from "./widgets/Checkbox.svelte";
import DateField from "./widgets/DateField.svelte";
import DateTimeField from "./widgets/DateTimeField.svelte";
import DateRangeField from "./widgets/DateRangeField.svelte";
import Details from "./widgets/Details.svelte";
import EmailField from "./widgets/EmailField.svelte";
import Fieldset from "./widgets/Fieldset.svelte";
import Group from "./widgets/Group.svelte";
import HiddenField from "./widgets/HiddenField.svelte";
import HorizontalGroup from "./widgets/HorizontalGroup.svelte";
import NumberField from "./widgets/NumberField.svelte";
import Radios from "./widgets/Radios.svelte";
import Select from "./widgets/Select.svelte";
import Submit from "./widgets/Submit.svelte";
import TextArea from "./widgets/TextArea.svelte";
import TextField from "./widgets/TextField.svelte";
import URLField from "./widgets/URLField.svelte";
import UploadField from "./widgets/UploadField.svelte";
import Multiple from "./widgets/multiple/Multiple.svelte";
import Table from "./widgets/multiple/Table.svelte";
import Tags from "./widgets/multiple/Tags.svelte";
import { Content } from "./types/content/index.js";
import FileExtensionInfo from "./validators/FileExtensionInfo.svelte";
import FileSizeInfo from "./validators/FileSizeInfo.svelte";

// Custom widget placeholder - the actual widget is stored in settings
const CustomWidget: Component<WidgetProps<any, any>> = {} as Component<WidgetProps<any, any>>;
const CustomMultipleWidget: Component<MultipleWidgetProps<any, any>> = {} as Component<MultipleWidgetProps<any, any>>;

export const allWidgetsRenderer = createFormRenderer({
  widgetComponents: {
    checkbox: Checkbox,
    content: Content,
    custom: CustomWidget as Component<WidgetProps<any, any>>,
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
    pagebreak: "EMPTY_COMPONENT"
  },
  multipleWidgetComponents: {
    custom: CustomMultipleWidget as Component<MultipleWidgetProps<any, any>>,
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
