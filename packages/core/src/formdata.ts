import { FormComponentWithName } from "./component";
import { Form } from "./form";

export function fromFormData<Data = Record<string, unknown>>(
  form: Form<Data>,
  formData: FormData
): Data {
  const returnData: Record<string, unknown> = {};
  form.components.map((component) => {
    returnData[component.name] = componentData(component, formData);
  });
  return returnData as Data;
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
