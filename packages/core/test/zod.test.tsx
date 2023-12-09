import "@testing-library/jest-dom";
import {
  textField,
  createForm,
  equals,
  or,
  exists,
  not,
  group,
  FormComponent,
  ComponentDataType,
  filterComponents,
  integerField,
  FormComponentWithName,
} from "../src";
import { validate } from "../src/schemaValidator";
import { ZodAny, ZodAnyDef, ZodRawShape, ZodType, z } from "zod";

describe("Zod", () => {
  const form = createForm({
    field: textField({ label: "Field" }),
    otherField: textField({ label: "Other field" }),
    dependentRules: textField({
      label: "Dependent rules",
      validators: [equals("dependent")],
      required: true,
      rules: [["twoRules", equals("two rules")]],
    }),
    requiredWithField: textField({
      label: "Required with field",
      required: true,
      rules: [["field", exists()]],
    }),
    twoRules: textField({
      label: "Two rules",
      validators: [equals("two rules")],
      rules: [
        ["field", equals("test")],
        ["otherField", exists()],
      ],
    }),
    group: group(
      {
        label: "A group",
      },
      {
        aNumber: integerField({
          label: "test",
          required: true,
        }),
        multiple: textField({
          label: "test",
          required: true,
          multiple: true,
        }),
      },
    ),
    /*
    orRule: textField({
      label: "Or rule",
      required: true,
      rules: [
        or([
          ["field", equals("test2")],
          ["otherField", exists()],
        ]),
      ],
    }),
    groupInGroup: textField({
      label: "group in group",
      required: true,
      rules: [
        not([
          or([
            ["field", exists()],
            ["otherField", exists()],
          ]),
        ]),
      ],
    }),*/
  });

  const types: Record<ComponentDataType, () => ZodType> = {
    string: () => z.string(),
    integer: () => z.number().int(),
    boolean: () => z.boolean(),
    float: () => z.number(),
    array: () => z.array([]),
  };
  const data = {
    field: "test",
    otherField: "asdf",
    twoRules: "two rules",
    requiredWithField: "asdf",
    dependentRules: "dependent",
  };
  const zodObjectFromComponents = (components: FormComponentWithName[]) => {
    const schema: ZodRawShape = {};
    for (const component of components) {
      if (!Array.isArray(component)) {
        if (component.type.dataType && types[component.type.dataType]) {
          schema[component.name] = !component.required
            ? z.optional(types[component.type.dataType]())
            : types[component.type.dataType]();
        } else if (component.type.dataType === "object") {
          schema[component.name] = zodObjectFromComponents(
            component.components as FormComponentWithName[],
          );
        }
        for (const validator of component.validators) {
          schema[component.name] = schema[component.name].refine((value) =>
            validator.type.valid(value, validator.settings),
          );
        }
      }
    }
    return z.object(schema);
  };
  const zodSchema = zodObjectFromComponents(
    filterComponents(form.components, data),
  );
  test("valid schema", () => {
    const result = zodSchema.safeParse(data);
    expect(result.success).toBe(true);
  });
});
