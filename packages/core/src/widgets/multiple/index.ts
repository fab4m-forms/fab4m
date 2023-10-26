import { ReactNode } from "react";
import {
  MultipleWidget,
  multipleWidget,
  MultipleWidgetType,
} from "../../widget";
import Multiple from "./Multiple";
import Table from "./Table";
import Tags from "./Tags";
import { FormComponent } from "src/component";

/**
 * Settings type definition for multiple widgets
 * @group Multiple widgets
 */
export interface MultipleSettings {
  addItemLabel?: string | ReactNode;
  removeItemLabel?: string | ReactNode;
  multipleLabels?: boolean;
}

/**
 * This widget is used as default multiple widget for
 * all components. It simply renders the component once for each item.
 * @group Multiple widgets
 */
export const defaultMultipleWidgetType: MultipleWidgetType<
  any,
  MultipleSettings
> = {
  name: "multiple",
  title: "Multiple values",
  widget: Multiple,
  init: (settings) => defaultMultipleWidget(settings),
};

/**
 * The widget is used as default multiple widget for
 * all components. It simply renders the component once for each item.
 * @group Multiple widgets
 */
export function defaultMultipleWidget(
  settings: MultipleSettings = {},
): MultipleWidget<any, MultipleSettings> {
  return multipleWidget({
    type: defaultMultipleWidgetType,
    settings,
  });
}
/**
 * Settings for the tags widget.
 * @group Multiple widgets
 */
export interface TagsSettings {
  addItemLabel?: string | ReactNode;
  removeItemLabel?: string | ReactNode;
  addOnChange?: boolean;
  itemAlreadyAddedMessage?: string;
}
/**
 * Classes for the theme definitions.
 * @internal
 */
export interface TagsClasses {
  /**
   * The tag wrapper.
   */
  tags: string;
  /**
   * The class on the tag itself.
   */
  tag: string;
  /**
   * The class for the tag label.
   */
  tagLabel: string;
  /**
   * The class for the remove tag button.
   */
  removeTag: string;
  /**
   * The class for the wrapper around the tag.
   */
  addTagWrapper: string;
  /**
   * The wrapper around the added tags.
   */
  addedTags: string;
  /**
   * The class for the add tag button.
   */
  addTag: string;
}

/**
 * The tags widget allows you to add items in a tag-like fasion.
 * @group Widgets
 */
export const tagsWidgetType: MultipleWidgetType<any, TagsSettings | undefined> =
  {
    name: "tags",
    title: "Multiple items as tags",
    widget: Tags,
    init: (settings) => tagsWidget(settings),
  };

/**
 * The tags widget allows you to add items in a tag-like fasion.
 * @group Widgets
 */
export function tagsWidget<Value>(
  settings?: TagsSettings,
): MultipleWidget<Value, TagsSettings | undefined> {
  return multipleWidget<Value, TagsSettings | undefined>({
    type: tagsWidgetType,
    settings,
  });
}

export interface ColumnArgs {
  props: React.HTMLProps<HTMLTableCellElement>;
  component: FormComponent;
  index: number;
}

export interface TableSettings extends MultipleSettings {
  headerColumn?: (args: ColumnArgs) => React.ReactNode;
}

/**
 * The table widget allows you to render multiple group components into
 * a table where the columns represent the form components of the group.
 * Each row is a representation of each item in the group.
 *
 * :::caution
 * This widget only works with the group form component!
 * :::
 *
 * @group Widgets
 */
export const tableWidgetType: MultipleWidgetType<any, TableSettings> = {
  name: "table",
  title: "Table",
  widget: Table,
  init: (settings) => tableWidget(settings),
};

/**
 * The table widget allows you to render multiple group components into
 * a table where the columns represent the form components of the group.
 * Each row is a representation of each item in the group.
 *
 * :::caution
 * This widget only works with the group form component!
 * :::
 *
 * @group Widgets
 */
export function tableWidget<ValueType = Record<string, any>>(
  settings: TableSettings = {},
): MultipleWidget<ValueType, TableSettings> {
  return multipleWidget<ValueType, TableSettings>({
    type: tableWidgetType,
    settings,
  });
}
