import { defaultTheme } from ".";
import {
  CreateFormComponentType,
  FormComponent,
  FormComponentWithName,
} from "./component";
import { createForm, Form } from "./form";
import { Schema, SchemaProperty } from "./schema";

type ComponentFn = (
  attributes: CreateFormComponentType<unknown>,
) => FormComponent;
export type FromSchemaConfig = {
  types: Record<string, ComponentFn>;
};

export function formFromSchema(schema: Schema, config: FromSchemaConfig): Form {
  const form = new Form<Record<string, any>>(
    defaultTheme,
    {},
    {
      description: schema.description,
    },
  );
  form.components = componentsFromSchema(schema.properties, config);
  return form;
}

function componentsFromSchema(
  properties: Record<string, SchemaProperty>,
  config: FromSchemaConfig,
) {
  const components: FormComponentWithName[] = [];

  for (const [name, property] of Object.entries(properties)) {
    if (typeof property.type !== "string") {
      continue;
    }
    let componentType: ComponentFn;
    if (property.type === "array" && !Array.isArray(property.items)) {
      componentType = config.types[property.items.type];
    } else {
      componentType = config.types[property.type];
    }
    if (componentType) {
      const component = componentType({
        multiple: property.type === "array",
      });
      if (property.type === "object") {
        component.components = componentsFromSchema(
          property.properties,
          config,
        );
      }
      components.push({ ...component, name });
    }
  }
  return components;
}
