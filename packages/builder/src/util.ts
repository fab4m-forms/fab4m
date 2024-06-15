import {
  SerializedComponent,
  SerializedComponentsList,
  SerializedForm,
  Theme,
  unserialize,
} from "@fab4m/fab4m";
import invariant from "tiny-invariant";
import { Plugin, Plugins, ValidatorTypePlugin, WidgetTypePlugin } from ".";
import { produce } from "immer";

export function invariantReturn<Type>(data: Type | undefined | null): Type {
  invariant(data);
  return data;
}

export function findPlugin<
  PluginType extends Plugin<any, any> & { type: { name: string } },
>(typeName: string, plugins: Array<PluginType>): PluginType {
  const pluginType = plugins.find((plugin) => plugin.type.name === typeName);
  return invariantReturn(pluginType);
}

export function findComponent(
  form: SerializedForm,
  name: string,
): SerializedComponent {
  const component = form.components.find(
    (c) => !Array.isArray(c) && c.name === name,
  );
  return invariantReturn(component) as SerializedComponent;
}

export function findComponentWidgets(
  type: string,
  widgets: WidgetTypePlugin[],
) {
  return widgets.filter(
    (widget) => widget.type.components.indexOf(type) !== -1,
  );
}

export function findComponentValidators(
  type: string,
  validators: ValidatorTypePlugin[],
) {
  return validators.filter(
    (validator) =>
      !validator.type.components ||
      validator.type.components.indexOf(type) !== -1,
  );
}

export function updateComponent(
  form: SerializedForm,
  key: string,
  component: SerializedComponent,
): SerializedForm {
  return produce(form, (draft) => {
    const [list, index] = findKey(draft.components, key);
    if (list) {
      list[index] = component;
    }
  });
}

export function removeComponent(
  form: SerializedForm,
  key: string,
): SerializedForm {
  return produce(form, (draft) => {
    const [list, index] = findKey(draft.components, key);
    if (list) {
      list.splice(index, 1);
    }
  });
}

export function unserializeForm(
  form: SerializedForm,
  plugins: Plugins,
  themes: Theme[],
) {
  return unserialize(
    form,
    plugins.types.map((p) => p.type),
    themes,
    plugins.widgets.map((w) => w.type),
    [],
    plugins.validators.map((v) => v.type),
  );
}

export function draggableItems(
  items: SerializedComponentsList,
  parent: string = "root:",
  result: Map<string, SerializedComponent> = new Map(),
) {
  for (const item of items) {
    if (!Array.isArray(item) && item) {
      result.set(`${parent}${item.name}`, item);
      if (item.components) {
        draggableItems(
          item.components,
          `${parent !== "root:" ? parent : ""}${item.name}:`,
          result,
        );
      }
    }
  }
  return result;
}

export function findKey(
  components: SerializedComponentsList,
  key: string,
): [SerializedComponentsList, number] | [null, -1] {
  if (key.startsWith("root:")) {
    key = key.split("root:")[1];
  } else {
    const parts = key.split(":");

    for (const part of parts.slice(0, parts.length - 1)) {
      const node = components.find((c) => !Array.isArray(c) && c.name === part);
      if (node && !Array.isArray(node) && node.components) {
        components = node.components;
      } else {
        return [null, -1];
      }
    }
    key = parts[parts.length - 1];
  }
  const index = components.findIndex(
    (c) => !Array.isArray(c) && c.name === key,
  );
  return [components, index];
}

export function findComponentFromKey(
  components: SerializedComponentsList,
  key: string,
): SerializedComponent {
  const [list, index] = findKey(components, key);
  if (!list) {
    throw new Error("Not found");
  }
  const component = list[index];
  if (Array.isArray(component)) {
    throw new Error("Variants not supported");
  }
  return component;
}
