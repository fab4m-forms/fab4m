import { FormComponentWithName } from "./component";
import { Form } from "./form";
import { ComponentDataDefinition } from "./formview";

export function fromFormData<Data = Record<string, unknown>>(
  form: Form<Data>,
  formData: FormData
): Data {
  // Use the definition passed to use from the client if it's available.
  const definitionData = formData.get("_definition");
  if (definitionData) {
    const definition: ComponentDataDefinition[] = JSON.parse(
      definitionData.toString()
    );
    return formDataFromDefinition(definition, formData) as Data;
  }
  // Otherwise we parse the data we can parse from the form.
  const returnData: Record<string, unknown> = {};
  for (const component of form.components) {
    // We can't handle variant data unless the client sent us a way to parse it,
    // so we bail from any component variant and only deal with components directly.
    if (Array.isArray(component)) {
      continue;
    }
    returnData[component.name] = componentData(component, formData);
  }
  return returnData as Data;
}

function formDataFromDefinition(
  definition: ComponentDataDefinition[],
  data: FormData
) {
  // We're going to need the keys from the form data many times, so
  // let's create an array of them at the top level.
  const keys = [...data.keys()];
  const typedData: Record<string, unknown> = {};
  for (const component of definition) {
    typedData[component.name] = convertFormDataValue(component, data, keys);
  }
  return typedData;
}

function convertFormDataValue(
  definition: ComponentDataDefinition,
  data: FormData,
  keys: string[]
): unknown {
  if (definition.multiple) {
    const items = [];
    const regex = new RegExp(
      `${definition.name
        .replace(/\[/g, "\\[")
        .replace(/\]/g, "\\]")}\\[(\\d+)\\]`
    );
    const componentKeys = keys.filter((key) => regex.test(key));
    for (const key of componentKeys) {
      const match = regex.exec(key);
      if (match) {
        const index = parseInt(match[1], 10);
        // There might be multiple key matches, only take the first one.
        if (items[index]) {
          continue;
        }
        items[index] = convertFormDataValue(
          {
            ...definition,
            multiple: false,
            name: `${definition.name}[${index}]`,
          },
          data,
          keys
        );
      }
    }
    return items;
  }
  if (definition.components) {
    const componentData: Record<string, unknown> = {};
    for (const component of definition.components) {
      componentData[component.name] = convertFormDataValue(
        {
          ...component,
          name: `${definition.name}[${component.name}]`,
        },
        data,
        keys
      );
    }
    return componentData;
  }
  const value = data.get(definition.name);
  if (value) {
    switch (definition.type) {
      case "float":
      case "integer":
        return value ? parseFloat(value.toString()) : undefined;
      case "boolean":
        return value ? true : false;
      default:
        return value;
    }
  }
  return undefined;
}

function componentData(
  component: FormComponentWithName,
  data: FormData,
  parents: string[] = []
) {
  if (component.multiple) {
    const returnData: unknown[] = [];
    const name = componentName(component.name, parents);
    const regex = new RegExp(
      name.replace(/\[/g, "\\[").replace(/\]/g, "\\]") +
        `\\[(\\d+)\\]` +
        // There's more in the match if this is a group.
        (!component.multiple ? "$" : "")
    );
    for (const key of data.keys()) {
      const result = regex.exec(key);
      if (result) {
        returnData[parseInt(result[1], 10)] = componentData(
          { ...component, multiple: false, name: result[1] },
          data,
          [...parents, component.name]
        );
      }
    }
    return returnData;
  }
  if (component.components) {
    const returnData: Record<string, unknown> = {};
    for (const child of component.components) {
      if (Array.isArray(child)) {
        continue;
      }
      returnData[child.name] = componentData(child, data, [
        ...parents,
        component.name,
      ]);
    }
    return returnData;
  }
  const value = data.get(componentName(component.name, parents));
  switch (component.type.dataType) {
    case "float":
    case "integer":
      return value ? parseInt(value as string, 10) : undefined;
    case "boolean":
      return value ? true : false;
    default:
      return value;
  }
}

function componentName(name: string, parents: string[]) {
  if (parents.length == 0) {
    return name;
  }
  let fieldName = parents[0];
  for (let i = 1; i < parents.length; i++) {
    fieldName += `[${parents[i]}]`;
  }
  return fieldName + `[${name}]`;
}
