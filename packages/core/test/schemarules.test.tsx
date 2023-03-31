import "@testing-library/jest-dom";
import { textField, createForm, equals, or, exists, not, group } from "../src";
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
      }
    ),
    /*multipleGroup: group(
      { label: "Multiple group", multiple: true },
      {
        field: textField({ label: "Field" }),
        dependent: textField({
          label: "Dependent",
          required: true,
          rules: [["multipleGroup.$.field", exists()]],
        }),
      }
    ),*/
    /*dependsOn: textField({
      label: "Depends on",
      required: true,
      rules: [["group.nestedField", exists()]],
    }),*/
  });

  test("Required conditional field", () => {
    expect(validate(form, { field: "text" }).valid).toBe(false);
    expect(
      validate(form, { field: "text", requiredWithField: "text" }).valid
    ).toBe(true);
  });

  test("Two rules must pass", () => {
    // The component exists and its validator passes.
    expect(validate(form, validData).valid).toBe(true);
    // The component should not exist, so this should be fine.
    expect(validate(form, { ...validData, otherField: undefined }).valid).toBe(
      true
    );
    // The field is not visible, so this should be fine as well.
    expect(validate(form, { ...validData, field: "notvisible" }).valid).toBe(
      true
    );
    // The component is visible, and has an invalid value.
    expect(validate(form, { ...validData, twoRules: "Invalid" }).valid).toBe(
      false
    );
  });

  test("Dependent rules", () => {
    // The two rules component is not present, so this should be valid.
    expect(
      validate(form, {
        ...validData,
        twoRules: undefined,
        dependentRules: undefined,
      }).valid
    ).toBe(true);

    // The dependent rule is not present.
    expect(
      validate(form, {
        ...validData,
        dependentRules: undefined,
      }).valid
    ).toBe(false);
    // The dependent rule has an invalid value.
    expect(
      validate(form, {
        ...validData,
        dependentRules: "notright",
      }).valid
    ).toBe(false);
  });

  test("Or group", () => {
    // If any of rules pass, then the property must exist.
    expect(
      validate(form, {
        field: "test2",
        requiredWithField: "present",
        otherField: "present",
        twoRules: undefined,
      }).valid
    ).toBe(false);
    expect(
      validate(form, {
        field: "test",
        requiredWithField: "present",
        otherField: "present",
      }).valid
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
      }).valid
    ).toBe(false);
  });
  test("Nested field, depends on outside", () => {
    expect(
      validate(nestedForm, {
        outside: "test",
        group: {},
      }).valid
    ).toBe(false);
    expect(
      validate(nestedForm, {
        outside: "test",
        group: { dependsOnOutside: "test" },
      }).valid
    ).toBe(true);
  });
});
