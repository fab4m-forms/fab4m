import { Components } from "../../form";
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
  const componentsList = [];
  for (const name in components) {
    const component = components[name];
    if (component) {
      componentsList.push({ name, ...component });
    }
  }
  return formComponent<DataType>({
    widget: groupWidget<DataType>(),
    ...attributes,
    settings: undefined,
    type: groupType,
    components: componentsList,
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
