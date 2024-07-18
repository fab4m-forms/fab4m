import { Plugins } from ".";

import {
  textAreaWidgetPlugin,
  textFieldPlugin,
  textFieldWidgetPlugin,
} from "./plugins/componentTypes/text";
import {
  booleanFieldPlugin,
  checkboxWidgetPlugin,
} from "./plugins/componentTypes/boolean";
import {
  contentPlugin,
  contentWidgetPlugin,
} from "./plugins/componentTypes/content";
import {
  emailFieldPlugin,
  emailFieldWidgetPlugin,
} from "./plugins/componentTypes/email";
import {
  fileFieldPlugin,
  fileUploadWidgetPlugin,
} from "./plugins/componentTypes/file";
import {
  detailsWidgetPlugin,
  fieldsetWidgetPlugin,
  groupPlugin,
  groupWidgetPlugin,
  horizontalGroupWidgetPlugin,
} from "./plugins/componentTypes/group";
import {
  integerFieldPlugin,
  floatFieldPlugin,
  numberFieldWidgetPlugin,
} from "./plugins/componentTypes/number";
import {
  pageBreakPlugin,
  pageBreakWidgetPlugin,
} from "./plugins/componentTypes/pagebreak";
import {
  linkFieldWidgetPlugin,
  urlFieldPlugin,
} from "./plugins/componentTypes/url";

import { autocompleteWidgetPlugin } from "./plugins/widgets/autocomplete";
import {
  radiosWidgetPlugin,
  selectWidgetPlugin,
} from "./plugins/widgets/options";

import { existsValidatorPlugin } from "./plugins/validators/exists";
import {
  minLengthValidatorPlugin,
  maxLengthValidatorPlugin,
} from "./plugins/validators/length";

import {
  minValidatorPlugin,
  maxValidatorPlugin,
} from "./plugins/validators/numbers";

import {
  allowedValuesValidatorPlugin,
  disallowedValuesValidatorPlugin,
} from "./plugins/validators/values";
import {
  dateFieldPlugin,
  datePickerWidgetPlugin,
  dateRangeFieldPlugin,
  dateRangePickerWidgetPlugin,
  dateTimeFieldPlugin,
  dateTimePickerWidgetPlugin,
} from "./plugins/componentTypes/date";

export const allPlugins: Plugins = {
  types: [
    textFieldPlugin,
    booleanFieldPlugin,
    contentPlugin,
    dateFieldPlugin,
    dateTimeFieldPlugin,
    dateRangeFieldPlugin,
    emailFieldPlugin,
    fileFieldPlugin,
    groupPlugin,
    integerFieldPlugin,
    floatFieldPlugin,
    pageBreakPlugin,
    urlFieldPlugin,
  ],
  widgets: [
    textFieldWidgetPlugin,
    textAreaWidgetPlugin,
    checkboxWidgetPlugin,
    contentWidgetPlugin,
    datePickerWidgetPlugin,
    dateRangePickerWidgetPlugin,
    dateTimePickerWidgetPlugin,
    emailFieldWidgetPlugin,
    fileUploadWidgetPlugin,
    groupWidgetPlugin,
    horizontalGroupWidgetPlugin,
    fieldsetWidgetPlugin,
    detailsWidgetPlugin,
    numberFieldWidgetPlugin,
    pageBreakWidgetPlugin,
    linkFieldWidgetPlugin,
    autocompleteWidgetPlugin,
    radiosWidgetPlugin,
    selectWidgetPlugin,
  ],
  validators: [
    existsValidatorPlugin,
    minLengthValidatorPlugin,
    maxLengthValidatorPlugin,
    minValidatorPlugin,
    maxValidatorPlugin,
    allowedValuesValidatorPlugin,
    disallowedValuesValidatorPlugin,
  ],
};
