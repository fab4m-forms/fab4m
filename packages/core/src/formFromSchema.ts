import { defaultTheme } from ".";
import {
  CreateFormComponentType,
  FormComponent,
  FormComponentWithName,
} from "./component";
import { Form } from "./form";
import { Schema, SchemaProperty } from "./schema";

type ComponentFn = (attributes: CreateFormComponentType<any>) => FormComponent;
export type ValidatorFn<Type extends SchemaProperty["type"]> = (
  component: FormComponent,
  property: SchemaProperty & { type: Type },
) => void;
export type FromSchemaConfig = {
  types: Record<string, ComponentFn>;
  validators: Record<string, ValidatorFn<any>>;
};

export function formFromSchema(schema: Schema, config: FromSchemaConfig): Form {
  const form = new Form<Record<string, any>>(
    defaultTheme,
    {},
    {
      description: schema.description,
    },
  );

  const resolvedSchema = resolveAllRefs(schema);

  form.components = componentsFromSchema(resolvedSchema.properties, config);
  return form;
}


function componentsFromSchema(
  properties: Record<string, SchemaProperty>,
  config: FromSchemaConfig,
) {
  const components: FormComponentWithName[] = [];
  for (const [name, property] of Object.entries(properties)) {
    let currentProperty = property;

    if (typeof currentProperty.type !== "string") {
      continue;
    }
    let componentType: ComponentFn;
    let itemProperty: SchemaProperty | undefined;

    if (currentProperty.type === "array" && !Array.isArray(currentProperty.items)) {
      itemProperty = currentProperty.items as SchemaProperty;
      // $ref resolution for itemProperty is also handled by resolveAllRefs
      componentType = config.types[itemProperty.type];
    } else {
      componentType = config.types[currentProperty.type];
    }

    if (componentType) {
      let component = componentType({
        multiple: currentProperty.type === "array",
      });

      const propertyForChildren = itemProperty && currentProperty.type === "array" ? itemProperty : currentProperty;

      if (propertyForChildren.type === "object" && propertyForChildren.properties) {
        component.components = componentsFromSchema(
          propertyForChildren.properties,
          config,
        );
      }
      component.label = currentProperty.title || name;
      component.validators = [];
      component = addValidators(component, propertyForChildren, config);
      components.push({ ...component, name });
    }
  }
  return components;
}

function addValidators(
  component: FormComponent,
  property: SchemaProperty,
  config: FromSchemaConfig,
) {
  for (const [prop, validator] of Object.entries(config.validators)) {
    if (typeof property[prop] !== "undefined") {
      validator(component, property);
    }
  }
  return component;
}

function resolveAllRefs(schema: Schema): Schema {
  const newSchema = JSON.parse(JSON.stringify(schema)); // Deep copy to avoid modifying original

  function traverseAndResolve(obj: any) {
    if (!obj || typeof obj !== 'object') {
      return;
    }

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (key === '$ref' && typeof obj[key] === 'string') {
          const resolved = resolveRef(obj[key], schema);
          if (resolved) {
            // Merge resolved properties into the current object, then delete $ref
            Object.assign(obj, resolved, obj);
            delete obj.$ref;
          } else {
            console.warn(`Could not resolve $ref: ${obj[key]}`);
          }
        } else {
          traverseAndResolve(obj[key]);
        }
      }
    }
  }

  traverseAndResolve(newSchema);
  return newSchema;
}

function resolveRef(ref: string, schema: Schema): SchemaProperty | undefined {
  if (!ref.startsWith("#/")) {
    // Only local references are supported for now
    return undefined;
  }

  const path = ref.substring(2).split("/");
  let current: any = schema;
  for (const segment of path) {
    if (current && typeof current === "object" && segment in current) {
      current = current[segment];
    } else {
      return undefined;
    }
  }
  return current as SchemaProperty;
}
