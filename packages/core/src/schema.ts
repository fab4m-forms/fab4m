import { FormComponent } from "./component";
import { FormDefinition } from "./form";
import { filterComponents } from "./rule";
interface ErrorObject {
  schemaPath: string;
  message?: string;
  dataPath: string;
}

interface SchemaObject {
  type: "object";
  description?: string;
  properties: Record<string, SchemaProperty>;
  title?: string;
  required?: string[];
  dependencies?: Record<string, Partial<Schema>>;
}

interface SchemaArray {
  type: "array";
  description?: string;
  title?: string;
  items: SchemaProperty | SchemaProperty[];
  minItems?: number;
  maxItems?: number;
}
/**
 * Definition of a JSON schema property.
 * @group JSON Schema
 */
export type SchemaProperty =
  | {
      type: "string" | "integer" | "number";
      description?: string;
      title?: string;
      minLength?: number;
      maxLength?: number;
      minimum?: number;
      maximum?: number;
      const?: string | number | boolean | { $data: string };
      enum?: Array<string | number>;
      format?: string;
      not?: {
        minLength?: number;
        maxLength?: number;
        const?: string | number | boolean;
        enum?: Array<string | number>;
      };
      properties?: Record<string, SchemaProperty>;
      pattern?: string;
    }
  | {
      type: "boolean";

      properties?: Record<string, SchemaProperty>;
      title?: string;
      description?: string;
    }
  | SchemaObject
  | SchemaArray;

interface PartialProperties {
  properties: Record<string, Partial<SchemaProperty>>;
}

export type CompoundType = "anyOf" | "allOf" | "not";

/**
 * Definition of a JSON Schema.
 * @group JSON Schema
 */
export interface Schema {
  title: string;
  description: string;
  type: string;
  properties: Record<string, SchemaProperty>;
  required: string[];
  dependencies?: Record<string, Partial<Schema>>;
  allOf?: Array<Partial<Schema>>;
  anyOf?: Array<Partial<Schema>>;
  not?: Partial<Schema>;
  if?: PartialProperties;
  then?: Partial<Schema>;
  else?: Partial<Schema>;
}

/**
 * Generate a default schema for a component based on it's definition.
 */
function defaultSchema(
  component: FormComponent,
  formData: Record<string, unknown>,
  data: Record<string, unknown>,
): SchemaProperty | undefined {
  const properties: Record<string, SchemaProperty> = {};
  const required: string[] = [];

  switch (component.type.dataType) {
    case "string":
      return {
        type: "string",
        description: component.description,
        title: component.label,
        minLength:
          component.type.dataType === "string" && component.required
            ? 1
            : undefined,
      };
    case "integer":
      return {
        type: "integer",
        title: component.label,
        description: component.description,
      };
    case "float":
      return {
        type: "number",
        title: component.label,
        description: component.description,
      };
    case "object":
      if (component.components) {
        for (const child of filterComponents(
          component.components,
          formData,
          false,
          data,
        )) {
          const childSchema = generateComponentSchema(child, formData, data);
          if (childSchema && child.name) {
            properties[child.name] = childSchema;
            if (child.required) {
              required.push(child.name);
            }
          }
        }
      }
      return {
        type: "object",
        title: component.label,
        description: component.description,
        properties,
        required,
      };
    case "boolean":
      return {
        type: "boolean",
        title: component.label,
        description: component.description,
      };
  }
  return undefined;
}

/**
 * Generate the schema for a specific component.
 * @group JSON Schema
 */
export function generateComponentSchema(
  component: FormComponent,
  formData: Record<string, unknown> = {},
  data: Record<string, unknown> = {},
): SchemaProperty | null {
  const generateDataSchema = (childData: Record<string, unknown>) => {
    let componentSchema = component.type.schema
      ? component.type.schema(
          component,
          defaultSchema(component, formData, childData),
        )
      : defaultSchema(component, formData, childData);
    if (!componentSchema) {
      return null;
    }
    for (const validator of component.validators) {
      if (componentSchema && componentSchema.type === "object") {
        componentSchema.properties = {
          ...componentSchema.properties,
          ...validator.type.schema(validator.settings, componentSchema),
        };
      } else {
        componentSchema = {
          ...componentSchema,
          ...validator.type.schema(validator.settings, componentSchema),
        };
      }
    }
    return componentSchema;
  };
  // We need to generate a schema for each row if this is an object, the component is multiple AND there are rules or variants
  // among the component children
  if (
    component.type.dataType === "object" &&
    component.multiple &&
    component.components &&
    component.name &&
    Array.isArray(data[component.name])
  ) {
    const schemas = (
      data[component.name] as Array<Record<string, unknown>>
    ).map(generateDataSchema);
    return {
      type: "array",
      description: component.description,
      title: component.label,
      items: schemas as SchemaProperty[],
      minItems: component.required ? component.minItems : 0,
      maxItems: component.maxItems,
    };
  }
  const componentSchema = generateDataSchema(
    component.type.dataType === "object" && component.name
      ? (data[component.name] as Record<string, unknown>)
      : data,
  );

  if (component.multiple && componentSchema) {
    return {
      type: "array",
      description: component.description,
      title: component.label,
      items: componentSchema,
      minItems: component.required ? component.minItems : 0,
      maxItems: component.maxItems,
    };
  }
  return componentSchema ?? null;
}

function schemaBase(form: FormDefinition): Schema {
  return {
    title: form.title ?? "Form data",
    description: form.description ?? "A form submission",
    type: "object",
    properties: {},
    required: [],
  };
}

/**
 * Generate a JSON schema for the provided form.
 * @param form The form to generate the schema for.
 * @param data The data to generate the schema for, if available.
 * @return A JSON schema for the form.
 * @group JSON Schema
 */
export function generateSchema(
  form: FormDefinition,
  data: Record<string, unknown> = {},
): Schema {
  const schema: Schema = schemaBase(form);
  for (const component of filterComponents(form.components, data)) {
    const componentSchema = generateComponentSchema(component, data, data);
    if (!componentSchema || !component.name) {
      continue;
    }
    schema.properties[component.name] = componentSchema;
    const required =
      component.required ||
      component.validators.findIndex(
        (validator) => validator.type.forceRequired,
      ) !== -1;
    if (required) {
      schema.required.push(component.name);
    }
  }
  return schema;
}

/**
 * Generate a JSON schema for each form part.
 * @param form The form to generate the part schemas for.
 * @param data The form data to generate the schema for, if available.
 * @return A list JSON schemas for each part of the form.
 * @group JSON Schema
 */
export function generatePartSchemas(
  form: FormDefinition,
  data: Record<string, unknown> = {},
): Schema[] {
  let part = 0;
  const partSchemas = [{ ...schemaBase(form) }];
  for (const component of form.components) {
    if (Array.isArray(component)) {
      continue;
    }
    const componentSchema = generateComponentSchema(component, data, data);
    if (componentSchema && component.name) {
      partSchemas[part].properties[component.name] = componentSchema;
      if (component.required) {
        partSchemas[part].required.push(component.name);
      }
    }
    if (component.type.splitsForm) {
      partSchemas.push({ ...schemaBase(form) });
      part++;
    }
  }
  return partSchemas;
}

/**
 * Get custom error messages for form components.
 * @param form The form to get messages for.
 * @return an object with the json path as the key and the message as the value.
 * @group JSON Schema
 */
export function schemaMessages(form: FormDefinition): Record<string, string> {
  const messages: Record<string, string> = {};
  for (const component of form.components) {
    if (Array.isArray(component)) {
      continue;
    }
    if (component.type.schemaErrorMessages) {
      const componentMessages = component.type.schemaErrorMessages(component);
      for (const key in componentMessages) {
        messages[`#/properties/${component.name}/${key}`] =
          componentMessages[key]();
      }
    }
    for (const validator of component.validators) {
      if (validator.type.schemaErrorMessages) {
        const validatorMessages = validator.type.schemaErrorMessages(
          validator.settings,
          component,
        );
        for (const key in validatorMessages) {
          messages[`#/properties/${component.name}/${key}`] =
            validatorMessages[key]();
        }
      }
    }
  }
  return messages;
}

/**
 * Get all error messages based on a list of errors as an object where the key is the JSON path
 * and the value is the error message.
 * @param form  The form to get the messages for.
 * @param errors The list of errors.
 * @return An object with the json path as the key and the message as the value.
 * @group JSON Schema
 */
export function errorMessages(
  form: FormDefinition,
  errors: ErrorObject[],
): Record<string, string> {
  const messages = schemaMessages(form);
  const errorsToReturn: Record<string, string> = {};
  for (const error of errors) {
    if (messages[error.schemaPath]) {
      errorsToReturn[error.dataPath] = messages[error.schemaPath];
    } else if (error.message) {
      errorsToReturn[error.dataPath] = error.message;
    }
  }
  return errorsToReturn;
}
