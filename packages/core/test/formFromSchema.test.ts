import {
  booleanField,
  Form,
  FormComponentsList,
  group,
  integerField,
  maxLength,
  maxLengthValidator,
  min,
  minLength,
  minLengthValidator,
  Schema,
  textField,
} from "../src";
import { formFromSchema, ValidatorFn } from "../src/formFromSchema";

describe("Form from schema", () => {
  const schema: Schema = {
    type: "object",
    title: "Test form",
    description: "Test form description",
    properties: {
      name: {
        type: "string",
        title: "Full name",
        minLength: 3,
      },
      age: {
        type: "integer",
        title: "Age",
        minimum: 18,
      },
      bio: {
        type: "string",
        title: "Biography",
        description: "A short bio about yourself.",
      },
      isStudent: {
        type: "boolean",
        title: "Are you a student?",
      },
      courses: {
        type: "array",
        title: "Courses",
        items: {
          type: "string",
        },
      },
      address: {
        type: "object",
        title: "Address",
        properties: {
          street: {
            type: "string",
            title: "Street",
          },
          city: {
            type: "string",
            title: "City",
          },
        },
        required: ["street"],
      },
    },
    required: ["name", "age"],
  };

  const minLengthFromSchema: ValidatorFn<"string"> = (c, p) => {
    c.validators?.push(minLength(p.minLength));
  };

  const minimumFromSchema: ValidatorFn<"number"> = (c, p) => {
    c.validators?.push(min(p.minimum ?? 0));
  };

  const form: Form = formFromSchema(schema, {
    types: {
      string: textField,
      integer: integerField,
      boolean: booleanField,
      object: (attributes) => group(attributes, {}),
    },
    validators: {
      minLength: minLengthFromSchema,
      minimum: minimumFromSchema,
    },
  });
  it("Basic types should be mapped properly", () => {
    expect(findComponent("name")?.type.name).toBe("text");
    expect(findComponent("age")?.type.name).toBe("integer");
    expect(findComponent("bio")?.type.name).toBe("text");
    expect(findComponent("isStudent")?.type.name).toBe("boolean");
  });

  it("Arrays should be multiple fields", () => {
    expect(findComponent("courses")?.type.name).toBe("text");
    expect(findComponent("courses")?.multiple).toBe(true);
  });

  it("Objects should map to groups with children", () => {
    const component = findComponent("address");
    expect(component?.type.name).toBe("group");
    expect(component?.components?.length).toBe(2);
    if (component?.components) {
      expect(findComponent("street", component.components)).toBeDefined();
      expect(findComponent("city", component.components)).toBeDefined();
    }
  });

  it("Validators should be applied", () => {
    const validator = findComponent("name")?.validators[0];
    expect(validator).toBeDefined();
    if (validator) {
      expect(validator.type.name).toBe("minLength");
      expect(validator.settings).toBe(3);
    }
    const minValidator = findComponent("age")?.validators[0];
    expect(minValidator).toBeDefined();
    if (minValidator) {
      expect(minValidator.type.name).toBe("min");
      expect(minValidator.settings).toBe(18);
    }
  });

  const findComponent = (name: string, components?: FormComponentsList) => {
    const found = (components || form.components).find(
      (c) => !Array.isArray(c) && c.name === name,
    );
    return found && !Array.isArray(found) ? found : undefined;
  };
});
