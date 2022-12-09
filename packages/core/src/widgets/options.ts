import Radios from "./Radios";
import { Widget, widget, WidgetType } from "../widget";
import Select from "./Select";
/**
 * Type definition for a selectable option in the options widget.
 * @group Widgets
 */
export type Option<OptionsType> = [string, OptionsType] | OptionsType;
/**
 * The option group is a group of options inside of the options widget.
 * @group Widgets
 */
export type OptionGroup<OptionsType> = [string, Options<OptionsType>];

/**
 * The options type is any option that is allowed for an options widget.
 * @group Widgets
 */
export type Options<OptionsType> = Array<
  Option<OptionsType> | OptionGroup<OptionsType>
>;

/**
 * Determine if an option is an option group and not an option.
 * @group Internal React API
 */
export function isOptionGroup<OptionsType>(
  option: Option<OptionsType> | OptionGroup<OptionsType>
): option is OptionGroup<OptionsType> {
  return Array.isArray(option) && Array.isArray(option[1]);
}

/**
 * Get the option value from an option.
 * @group Internal React API
 */
export function optionValue(option: Option<unknown>) {
  return Array.isArray(option) ? option[1] : option;
}

/**
 * The radios widget renders the options as a serios of radio buttons.
 * @group Widgets
 */
export const radiosWidgetType: WidgetType<any, Option<any>[]> = {
  name: "radios",
  title: "Radios",
  components: ["text", "integer", "float"],
  widget: Radios,
  init: (options) => radiosWidget(options ? options : []),
};

/**
 * The select widget settings type definition.
 * @group Widgets
 */
export interface SelectWidgetSettings<OptionsType> {
  options: Options<OptionsType>;
  notSelectedLabel?: string;
}

/**
 * The select widget renders a select html element with the defined options.
 * @group Widgets
 */
export const selectWidgetType: WidgetType<any, SelectWidgetSettings<any>> = {
  name: "select",
  title: "Select",
  components: ["text", "integer", "float"],
  widget: Select,
  init: (settings) =>
    selectWidget(
      settings?.options,
      settings ? { notSelectedLabel: settings.notSelectedLabel } : undefined
    ),
};

/**
 * The radios widget renders the options as a serios of radio buttons.
 * @group Widgets
 */
export function radiosWidget<OptionsType>(
  options: Option<OptionsType>[] = []
): Widget<OptionsType, Option<OptionsType>[]> {
  return widget<OptionsType, Option<OptionsType>[]>({
    type: radiosWidgetType,
    settings: options,
  });
}

/**
 * The select widget renders a select html element with the defined options.
 * @group Widgets
 */
export function selectWidget<OptionsType>(
  options: Options<OptionsType> = [],
  settings: Omit<SelectWidgetSettings<OptionsType>, "options"> = {}
): Widget<OptionsType, SelectWidgetSettings<OptionsType>> {
  return widget({
    type: selectWidgetType,
    settings: { options, ...settings },
  });
}

/**
 * @internal
 */
export function findOption<OptionsType>(
  options: Options<OptionsType>,
  value: OptionsType
): Option<OptionsType> | void {
  for (const option of options) {
    if (isOptionGroup(option)) {
      const childOption = findOption(option[1], value);
      if (childOption) {
        return childOption;
      }
    } else {
      if (optionValue(option) === value) {
        return option;
      }
    }
  }
}
