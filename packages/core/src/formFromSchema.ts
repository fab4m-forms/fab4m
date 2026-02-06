import { defaultTheme } from ".";
import {
  CreateFormComponentType,
  FormComponent,
  FormComponentWithName,
} from "./component";
import { Form } from "./form";
import { Schema, SchemaEntry, SchemaProperty } from "./schema";

type ComponentFn = (attributes: CreateFormComponentType<any>) => FormComponent;

export type ValidatorFn<Type extends string> = (
  component: FormComponent,
  property: SchemaEntry & { type: Type },
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

    // After resolveAllRefs, currentProperty should not have $ref, but it might not have 'type'
    // if it's a complex object without a direct type or if resolution failed.
    // We need to ensure 'type' exists before proceeding.
    if (
      !("type" in currentProperty) ||
      typeof currentProperty.type !== "string"
    ) {
      throw new Error(
        `Property ${name} does not have a valid 'type' after $ref resolution`,
      );
    }

    let componentType: ComponentFn;
    let itemProperty: SchemaProperty | undefined;

    if (
      currentProperty.type === "array" &&
      !Array.isArray(currentProperty.items)
    ) {
      itemProperty = currentProperty.items as SchemaProperty;
      // Ensure itemProperty has a type after resolution
      if (!("type" in itemProperty) || typeof itemProperty.type !== "string") {
        throw new Error(
          `Array item property for ${name} does not have a valid 'type' after $ref resolution.`,
        );
      }
      componentType = config.types[itemProperty.type];
    } else {
      componentType = config.types[currentProperty.type];
    }

    if (componentType) {
      let component = componentType({
        multiple: currentProperty.type === "array",
      });

      const propertyForChildren =
        itemProperty && currentProperty.type === "array"
          ? itemProperty
          : currentProperty;

      // Ensure propertyForChildren has 'type' and 'properties' before accessing
      if (
        "type" in propertyForChildren &&
        propertyForChildren.type === "object" &&
        "properties" in propertyForChildren &&
        propertyForChildren.properties
      ) {
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
    // Check if the property has the validator's key and its value is not undefined
    // Use Object.prototype.hasOwnProperty.call for safer property checking
    if (
      Object.prototype.hasOwnProperty.call(property, prop) &&
      typeof (property as any)[prop] !== "undefined"
    ) {
      // Cast property to 'any' to allow indexing with 'prop' string,
      // then cast to the expected type for the validator function.
      validator(component, property as any);
    }
  }
  return component;
}

function resolveAllRefs(schema: Schema): Schema {
  const newSchema = JSON.parse(JSON.stringify(schema)); // Deep copy to avoid modifying original

  function traverseAndResolve(obj: any) {
    if (!obj || typeof obj !== "object") {
      return;
    }

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (key === "$ref" && typeof obj[key] === "string") {
          const resolved = resolveRef(obj[key], schema);
          if (resolved) {
            // Merge resolved properties into the current object, then delete $ref
            // This ensures that any properties defined alongside the $ref are preserved
            // and override properties from the resolved reference if there's a conflict.
            const originalProps = { ...obj }; // Keep original properties
            Object.assign(obj, resolved); // Apply resolved properties
            Object.assign(obj, originalProps); // Re-apply original properties to override
            delete obj.$ref; // Remove $ref after resolution
          } else {
            throw new Error(`Could not resolve $ref: ${obj[key]}`);
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
