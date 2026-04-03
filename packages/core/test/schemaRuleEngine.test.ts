import { createForm, equals, exists, group, not, or, textField } from "../src";
import { validate } from "../src/schemaValidator";

describe("Schema Rule engine", () => {
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
    }),
  });

  const validData = {
    field: "test",
    requiredWithField: "test",
    otherField: "exists",
    twoRules: "two rules",
    dependentRules: "dependent",
    orRule: "text",
  };

  const nestedForm = createForm({
    outside: textField({ label: "Outside" }),
    group: group(
      {
        label: "Group",
      },
      {
        nestedField: textField({ label: "Nested field" }),
        otherField: textField({
          label: "Other field",
          required: true,
          rules: [["group.nestedField", exists()]],
        }),
        dependsOnOutside: textField({
          label: "Depends on outside",
          required: true,
          rules: [["outside", exists()]],
        }),
      },
    ),
    multipleGroup: group(
      { label: "Multiple group", multiple: true },
      {
        field: textField({ label: "Field" }),
        dependent: textField({
          label: "Dependent",
          required: true,
          rules: [["multipleGroup.$.field", exists()]],
        }),
      },
    ),
  });

  test("Required conditional field", () => {
    expect(validate(form, { field: "text" }).valid).toBe(false);
    expect(
      validate(form, { field: "text", requiredWithField: "text" }).valid,
    ).toBe(true);
  });

  test("Two rules must pass", () => {
    expect(validate(form, validData).valid).toBe(true);
    expect(validate(form, { ...validData, otherField: undefined }).valid).toBe(
      true,
    );
    expect(validate(form, { ...validData, field: "notvisible" }).valid).toBe(
      true,
    );
    expect(validate(form, { ...validData, twoRules: "Invalid" }).valid).toBe(
      false,
    );
  });

  test("Dependent rules", () => {
    expect(
      validate(form, {
        ...validData,
        twoRules: undefined,
        dependentRules: undefined,
      }).valid,
    ).toBe(true);

    expect(
      validate(form, {
        ...validData,
        dependentRules: undefined,
      }).valid,
    ).toBe(false);
    expect(
      validate(form, {
        ...validData,
        dependentRules: "notright",
      }).valid,
    ).toBe(false);
  });

  test("Or group", () => {
    expect(
      validate(form, {
        field: "test2",
        requiredWithField: "present",
        otherField: "present",
        twoRules: undefined,
      }).valid,
    ).toBe(false);
    expect(
      validate(form, {
        field: "test",
        requiredWithField: "present",
        otherField: "present",
      }).valid,
    ).toBe(false);
  });

  test("Group in group", () => {
    expect(validate(form, {}).valid).toBe(false);
  });

  test("Nested validation rule", () => {
    expect(
      validate(nestedForm, {
        group: {
          nestedField: "test",
        },
      }).valid,
    ).toBe(false);
    expect(
      validate(nestedForm, {
        group: { nestedField: "test", otherField: "test" },
      }).valid,
    ).toBe(true);
  });

  test("Nested field, depends on outside", () => {
    expect(
      validate(nestedForm, {
        outside: "test",
        group: {},
      }).valid,
    ).toBe(false);
    expect(
      validate(nestedForm, {
        outside: "test",
        group: { dependsOnOutside: "test" },
      }).valid,
    ).toBe(true);
  });

  test("Rules in arrays", () => {
    expect(
      validate(nestedForm, {
        multipleGroup: [{ field: "test" }],
      }).valid,
    ).toBe(false);
    expect(
      validate(nestedForm, {
        multipleGroup: [{ field: "test", dependent: "test" }],
      }).valid,
    ).toBe(true);
  });
});
