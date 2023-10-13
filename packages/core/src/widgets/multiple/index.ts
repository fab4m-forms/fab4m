import { ReactNode } from "react";
import {
  MultipleWidget,
  multipleWidget,
  MultipleWidgetType,
} from "../../widget";
import Multiple from "./Multiple";
import Table from "./Table";
import Tags from "./Tags";

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
  settings: MultipleSettings = {}
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
  settings?: TagsSettings
): MultipleWidget<Value, TagsSettings | undefined> {
  return multipleWidget<Value, TagsSettings | undefined>({
    type: tagsWidgetType,
    settings,
  });
}

export const tableWidgetType: MultipleWidgetType<any, MultipleSettings> = {
  name: "table",
  title: "Render multiple groups in a table",
  widget: Table,
  init: (settings) => tableWidget(settings),
};

export function tableWidget<Value>(
  settings: MultipleSettings = {}
): MultipleWidget<Value, MultipleSettings> {
  return multipleWidget<Value, MultipleSettings>({
    type: tableWidgetType,
    settings,
  });
}
