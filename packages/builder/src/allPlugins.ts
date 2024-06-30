import { Plugins } from ".";
import {
  textAreaWidgetPlugin,
  textFieldPlugin,
  textFieldWidgetPlugin,
} from "./plugins/componentTypes/text";

export const allPlugins: Plugins = {
  types: [textFieldPlugin],
  widgets: [textFieldWidgetPlugin, textAreaWidgetPlugin],
  validators: [],
};
