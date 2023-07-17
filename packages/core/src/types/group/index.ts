import { Components, componentsListFromObject } from "../../form";
import {
  CreateFormComponentType,
  formComponent,
  FormComponentType,
  FormComponent,
} from "../../component";
import { Widget, widget, WidgetType } from "../../widget";
import Fieldset from "./Fieldset";
import Group from "./Group";
import HorizontalGroup from "./HorizontalGroup";

import Details from "./Details";

/**
 * The group form component type allows you to group components together.
 * @group Components
 */
export const groupType: FormComponentType = {
  name: "group",
  title: "group",
  dataType: "object",
};
type GroupWidgetType = WidgetType<Record<string, any>, undefined>;

/**
 * The group component allows you to create a group of components.
 * The group can be grouped in the form using group widgets and the
 * data in the grouped components will be added to an object.
 * @group Components
 */
export function group<DataType = Record<string, any>>(
  attributes: Omit<CreateFormComponentType<DataType>, "settings">,
  components: Components<DataType>
): FormComponent<DataType> {
  return formComponent<DataType>({
    widget: groupWidget<DataType>(),
    ...attributes,
    settings: undefined,
    type: groupType,
    components: componentsListFromObject<DataType>(components),
  });
}

/**
 * Widget type that renders a group as a fieldset.
 * @group Widgets
 */
export const fieldsetWidgetType: GroupWidgetType = {
  name: "fieldset",
  components: ["group"],
  title: "Fieldset",
  widget: Fieldset,
  init: fieldsetWidget,
};

/**
 * Renders a group as an HTML fieldset.
 * @group Widgets
 */
export function fieldsetWidget<DataType = Record<string, any>>(): Widget<
  DataType,
  undefined
> {
  const widgetType: WidgetType<DataType, undefined> = {
    name: "fieldset",
    components: ["group"],
    title: "Fieldset",
    widget: Fieldset,
    init: fieldsetWidget,
  };
  return widget({
    type: widgetType,
    settings: undefined,
  });
}

/**
 * Basic group widget type that only renders the members of the groups
 * with a div around it.
 * @group Widgets
 */
export const groupWidgetType: GroupWidgetType = {
  name: "group",
  components: ["group"],
  title: "Group",
  widget: Group,
  init: groupWidget,
};

/**
 * Basic group widget that only renders the members of the groups
 * with a div around it.
 *
 * See [the group component page](/docs/components/group) for an example of how it works.
 *
 * @group Widgets
 */
export function groupWidget<DataType = Record<string, any>>(): Widget<
  DataType,
  undefined
> {
  const widgetType: WidgetType<DataType, undefined> = {
    name: "group",
    components: ["group"],
    title: "Group",
    widget: Group,
    init: groupWidget,
  };
  return widget<DataType, undefined>({
    type: widgetType,
    settings: undefined,
  });
}

/**
 * This widget type renders a group of fields horizontally.
 * @group Widgets
 */
export const horizontalGroupWidgetType: GroupWidgetType = {
  name: "horizontal_group",
  components: ["group"],
  title: "Horizontal Group",
  widget: HorizontalGroup,
  init: horizontalGroupWidget,
};

/**
 * This widget renders a group of fields horizontally.
 * @group Widgets
 */
export function horizontalGroupWidget<DataType = Record<string, any>>(): Widget<
  DataType,
  undefined
> {
  const widgetType: WidgetType<DataType, undefined> = {
    name: "horizontal_group",
    components: ["group"],
    title: "Horizontal Group",
    widget: HorizontalGroup,
    init: horizontalGroupWidget,
  };
  return widget<DataType, undefined>({
    type: widgetType,
    settings: undefined,
  });
}

/**
 * Describes a summary that can be rendered as part of the details widget.
 * @group widgets
 */
export type Summary<DataType> =
  | React.ReactNode
  | ((data?: DataType) => React.ReactNode);

/**
 * Settings for the Details widget.
 */
export interface DetailsSettings<DataType> {
  // The summary can be used to render custom summary content.
  summary?: Summary<DataType>;
  // Indicates if the summary will be open or closed by default.
  open?: boolean;
}

/**
 * This widget renders a group of fields inside of a details
 * html element with a summary as a label.
 * @group Widgets
 */
export const detailsWidgetType: WidgetType<
  Record<string, any>,
  DetailsSettings<Record<string, any>>
> = {
  name: "details",
  components: ["group"],
  title: "Details",
  widget: Details,
  init: detailsWidget,
};

/**
 * This widget renders a group of fields inside of a details
 * html element with a summary as a label.
 * @group Widgets
 */
export function detailsWidget<DataType = Record<string, any>>(
  settings: DetailsSettings<DataType> = {}
): Widget<DataType, DetailsSettings<DataType>> {
  const widgetType: WidgetType<DataType, DetailsSettings<DataType>> = {
    name: "details",
    components: ["group"],
    title: "Details",
    widget: Details,
    init: detailsWidget,
  };
  return widget<DataType, DetailsSettings<DataType>>({
    type: widgetType,
    settings,
  });
}
