import { FormComponent, FormComponentWithName } from "./component";
import {
  FormComponentsList,
  FormComponentVariant,
  FormDefinition,
} from "./form";
import { AnyRule } from "./rule";
import { Validator } from "./validator";
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
function defaultSchema(component: FormComponent): SchemaProperty | undefined {
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
        for (const child of component.components) {
          if (Array.isArray(child)) {
            continue;
          }
          const childSchema = generateComponentSchema(child);
          if (childSchema && child.name) {
            properties[child.name] = childSchema;
            if (child.required && child.rules && child.rules.length === 0) {
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
): SchemaProperty | null {
  let componentSchema = component.type.schema
    ? component.type.schema(component, defaultSchema(component))
    : defaultSchema(component);
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

type FormComponentWithParents = FormComponentWithName & { parents?: string[] };
/**
 * Generate a JSON schema for the provided form.
 * @param form The form to generate the schema for.
 * @return A JSON schema for the form.
 * @group JSON Schema
 */
export function generateSchema(form: FormDefinition): Schema {
  const schema: Schema = {
    ...schemaBase(form),
    ...generateBaseSchema(form.components),
  };
  addSchemaRules(schema, form.components);
  return schema;
  const componentSchemas: Record<string, SchemaProperty> = {};
  const hasRules: Array<FormComponentWithParents> = [];
  const rules: Map<string, Array<Partial<Schema>>> = new Map();
  const variants: Array<FormComponentVariant> = [];
  const groupRules = [];
  //schema = { schema, ...generateBaseSchema(form.components) };
  for (const component of form.components) {
    if (Array.isArray(component)) {
      for (const variant of component) {
        const variantSchema = generateComponentSchema(variant.component);
        if (!variantSchema || !variant.component.name) {
          continue;
        }
        if (!variant.rule) {
          componentSchemas[variant.component.name] = variantSchema;
          schema.properties[variant.component.name] = variantSchema;
        } else {
          variants.push(variant);
        }
      }
    } else {
      const componentSchema = generateComponentSchema(component);
      if (!componentSchema || !component.name) {
        continue;
      }
      componentSchemas[component.name] = componentSchema;
      schema.properties[component.name] = componentSchema;
      const required =
        component.required ||
        component.validators.findIndex(
          (validator) => validator.type.forceRequired,
        ) !== -1;
      if (required) {
        // If this component has rules, then we need to add required only
        // when it exists.
        if (component.rules.length === 0) {
          schema.required.push(component.name);
        } else {
          hasRules.push(component);
        }
      }
      addChildRules(component, hasRules, [component.name]);
    }
  }
  const variantSchemas = [];
  for (const variant of variants) {
    if (!variant.rule) {
      continue;
    }
    const variantSchema = generateComponentRuleSchema(
      variant.rule,
      variant.component,
      componentSchemas,
      true,
    );
    if (variantSchema) {
      variantSchemas.push(variantSchema);
    }
  }

  for (const component of hasRules) {
    for (const rule of component.rules) {
      const ruleSchema = generateComponentRuleSchema(
        rule,
        component,
        componentSchemas,
      );
      if (!ruleSchema) {
        continue;
      }
      if (Array.isArray(rule)) {
        const dependencyRules = rules.get(rule[0]) ?? [];
        dependencyRules.push(ruleSchema);
        rules.set(rule[0], dependencyRules);
      } else {
        groupRules.push(ruleSchema);
      }
    }
  }
  for (const [dependency, dependencyRules] of rules.entries()) {
    const parts = dependency.split(".");
    let cursor: SchemaObject | SchemaArray = schema as SchemaObject;
    while (parts.length > 1) {
      const part = parts.shift();
      if (part) {
        if (
          part === "$" &&
          cursor.type === "array" &&
          !Array.isArray(cursor.items) &&
          (cursor.items.type === "object" || cursor.items.type === "array")
        ) {
          cursor = cursor.items;
        } else if (cursor.type === "object") {
          cursor = cursor.properties[part] as SchemaObject | SchemaArray;
        }
      }
    }
    if (cursor.type === "object") {
      cursor.dependencies ??= {};
      cursor.dependencies[parts[0]] = {
        allOf: dependencyRules,
      };
    }
  }
  if (groupRules.length > 0) {
    schema.allOf = [];
    for (const group of groupRules) {
      schema.allOf.push(group);
    }
  }

  if (variantSchemas.length > 0) {
    schema.allOf = [];
    for (const variantSchema of variantSchemas) {
      variantSchema.else = {};
      schema.allOf.push(variantSchema);
    }
  }
  return schema;
}

/**
 * Generate the basic schema for an object, excluding any variants.
 */
function generateBaseSchema(components: FormComponentsList) {
  const object: SchemaObject = {
    type: "object",
    properties: {},
    required: [],
  };
  for (const component of components) {
    if (Array.isArray(component)) {
      continue;
    }
    const componentSchema = generateComponentSchema(component);
    if (!componentSchema || !component.name) {
      continue;
    }
    object.properties[component.name] = componentSchema;
    const required =
      component.required ||
      component.validators.findIndex(
        (validator) => validator.type.forceRequired,
      ) !== -1;
    if (required) {
      // If this component has rules, then we need to add required only
      // when it exists.
      if (component.rules.length === 0) {
        object.required.push(component.name);
      }
    }
  }
  return object;
}

function addSchemaRules(schema: SchemaObject, components: FormComponentsList) {
  for (const component of components) {
    if (Array.isArray(component)) {
      continue;
    }
    if (component.rules.length === 0 || !component.required) {
      continue;
    }

    for (const rule of component.rules) {
      const ruleSchema = generateComponentRuleSchema(rule, component, schema);
      if (ruleSchema.type === "rule") {
        schema.dependencies ??= {};
        const dependency = schema.dependencies[ruleSchema.path[0]];
        if (!dependency || !dependency.allOf) {
          schema.dependencies[ruleSchema.path[0]] = {
            allOf: [ruleSchema.schema],
          };
        } else {
          dependency.allOf.push(ruleSchema.schema);
        }
      } else {
        schema.allOf ??= [];
        schema.allOf.push(ruleSchema.schema);
      }
    }
  }
}

/**
 * Generate rules for components within an object.
 * @param component
 * @param hasRules
 * @param parents
 */
function generateRules() {}

function generateVariantSchemas() {}
function addChildRules(
  component: FormComponentWithParents,
  hasRules: FormComponentWithParents[],
  parents: string[],
) {
  if (!component.components) {
    return;
  }
  for (const child of component.components as FormComponentWithParents[]) {
    if (Array.isArray(child)) {
      continue;
    }
    if (child.rules.length > 0) {
      child.parents = parents;
      hasRules.push(child);
    }
    addChildRules(child, hasRules, [...parents, component.name]);
  }
}

function addVariants(
  component: FormComponentWithParents,
  variants: FormComponentVariant[],
  parents: string[],
) {
  if (!component.components) {
    return;
  }
  for (const child of component.components as FormComponentWithParents[]) {
    if (Array.isArray(child)) {
      for (const variant of child) {
        variants.push(variant);
        addVariants(variant.component, variants, parents);
      }
    }
    addVariants(child, variants, [...parents, component.name]);
  }
}

function generateComponentRuleSchema(
  rule: AnyRule,
  component: FormComponentWithName,
  schema: SchemaObject,
  withComponent = false,
):
  | { type: "rule"; schema: Partial<Schema>; path: string[] }
  | { type: "group"; schema: Partial<Schema> } {
  if (Array.isArray(rule)) {
    const path = rule[0].split(".");
    return {
      type: "rule",
      schema: buildIfStatement(path, rule[1], component, schema, withComponent),
      path,
    };
  }
  const groupRules: Array<Partial<Schema>> = [];
  for (const childRule of rule.rules) {
    const childSchema = generateComponentRuleSchema(
      childRule,
      component,
      schema,
      withComponent,
    );
    if (!childSchema) {
      continue;
    }
    if (Array.isArray(childRule)) {
      groupRules.push({ dependencies: { [childRule[0]]: childSchema } });
    } else {
      groupRules.push(childSchema);
    }
  }
  return {
    type: "group",
    schema: rule.type.schema
      ? rule.type.schema(groupRules)
      : { [rule.type.schemaCompoundKeyword]: groupRules },
  };
}

function buildIfStatement(
  path: string[],
  validator: Validator,
  component: FormComponentWithParents,
  componentSchema: SchemaObject,
  withComponent = false,
): any {
  const ifStatement: Partial<Schema> = {
    if: {
      properties: {},
    },
    then: {},
  };
  let thenCursor: Partial<SchemaProperty> =
    ifStatement.then as Partial<SchemaProperty>;
  let schemaCursor: SchemaProperty = componentSchema.properties[path[0]];
  if (component.parents) {
    for (let i = 0; i < component.parents.length; i++) {
      // Exclude parts of our path that is part of the
      if (path[i] === component.parents[i]) {
        continue;
      }
      const parent = component.parents[i];
      if (thenCursor.type === "object" || !thenCursor.type) {
        (thenCursor as SchemaObject).properties = {
          [parent]: { type: "object", properties: {} },
        };
        if ((thenCursor as SchemaObject).properties[parent]) {
          thenCursor = (thenCursor as SchemaObject).properties[parent];
        }
      }
    }
  }
  for (const node of path.slice(1)) {
    if (
      node === "$" &&
      schemaCursor.type === "array" &&
      schemaCursor.items &&
      !Array.isArray(schemaCursor.items)
    ) {
      schemaCursor = schemaCursor.items;
    } else if (schemaCursor.type === "object") {
      schemaCursor = schemaCursor.properties[node];
    }
  }
  (thenCursor as SchemaObject).required = [component.name];
  if (withComponent) {
    const componentSchema = generateComponentSchema(component);
    if (componentSchema) {
      (thenCursor as SchemaObject).properties = {
        [component.name]: componentSchema,
      };
    }
  }
  if (ifStatement.if) {
    ifStatement.if.properties[path[path.length - 1]] = validator.type.schema(
      validator.settings,
      schemaCursor,
    );
  }
  return ifStatement;
}

/**
 * Generate a JSON schema for each form part.
 * @param form The form to generate the part schemas for.
 * @return A list JSON schemas for each part of the form.
 * @group JSON Schema
 */
export function generatePartSchemas(form: FormDefinition): Schema[] {
  let part = 0;
  const partSchemas = [{ ...schemaBase(form) }];
  for (const component of form.components) {
    if (Array.isArray(component)) {
      continue;
    }
    const componentSchema = generateComponentSchema(component);
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
