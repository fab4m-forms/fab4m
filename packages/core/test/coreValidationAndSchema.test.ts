import {
  allowedValues,
  and,
  basic,
  disallowedValues,
  emailField,
  equals,
  exists,
  fieldsetWidgetType,
  FormComponent,
  generateComponentSchema,
  generateSchema,
  group,
  groupType,
  groupWidgetType,
  integerField,
  max,
  maxLength,
  min,
  minLength,
  not,
  or,
  orType,
  serialize,
  SerializedComponent,
  textField,
  textFieldType,
  textFieldWidgetType,
  unserialize,
  createForm,
} from "../src";
import { validate } from "../src/schemaValidator";

describe("Core-only validation and schema tests", () => {
  test("Form error when adding component with the same name", () => {
    const form = createForm({});
    const field = textField({ name: "otherfield", label: "other field" });
    form.add(field);
    expect(() => form.add(field)).toThrowError(
      "A component with the same name already exists.",
    );
  });

  test("Length validator schema", () => {
    const form = createForm();
    const minValidator = minLength();
    const maxValidator = maxLength();
    form.add(
      textField({
        name: "text",
        label: "A text field",
        validators: [minValidator, maxValidator],
      }),
    );
    minValidator.settings = 5;
    maxValidator.settings = 10;
    /*const schema = generateSchema(form);
    if (schema.properties.text.type === "string") {
      expect(schema.properties.text.minLength).toBe(5);
      expect(schema.properties.text.maxLength).toBe(10);
    }*/
  });

  test("Allowed/disallowed values schema + validation", () => {
    const form = createForm({
      disallowedText: textField({
        label: "A text field",
        required: true,
        validators: [
          disallowedValues(["text", "text2"], "Custom disallowed message"),
        ],
      }),
      allowedText: textField({
        label: "Another text field",
        required: true,
        validators: [
          allowedValues(["text", "text2"], "Custom allowed message"),
        ],
      }),
    });
    /*const schema = generateSchema(form);
       if (schema.properties.disallowedText.type === "string") {
      expect(schema.properties.disallowedText.not?.enum).toEqual(
        expect.arrayContaining(["text", "text2"]),
      );
    }
    if (schema.properties.allowedText.type === "string") {
      expect(schema.properties.allowedText.enum).toEqual(
        expect.arrayContaining(["text", "text2"]),
      );
    }*/
    const validResult = validate(form, {
      allowedText: "text",
      disallowedText: "notText",
    });
    const invalidResult = validate(form, {
      allowedText: "notText",
      disallowedText: "text",
    });
    expect(validResult.valid).toBe(true);
    expect(invalidResult.valid).toBe(false);
    expect(invalidResult.errors["/disallowedText"]).toBe(
      "Custom disallowed message",
    );
    expect(invalidResult.errors["/allowedText"]).toBe("Custom allowed message");
  });

  test("min/max validator schema + validation", () => {
    const form = createForm({
      minValue: integerField({ label: "Min value", validators: [min(5)] }),
      maxValue: integerField({ label: "Max value", validators: [max(10)] }),
    });
    /*const schema = generateSchema(form);
    if (schema.properties.minValue?.type === "number") {
      expect(schema.properties.minValue?.minimum).toBe(5);
    }
    if (schema.properties.maxValue?.type === "number") {
      expect(schema.properties.maxValue?.maximum).toBe(10);
    }*/
    expect(validate(form, { minValue: 6, maxValue: 10 }).valid).toBe(true);
    expect(validate(form, { minValue: 4, maxValue: 11 }).valid).toBe(false);
  });

  test("equals validator schema + validation", () => {
    const form = createForm();
    form.add(textField({ name: "first", label: "First" }));
    form.add(
      textField({
        name: "second",
        label: "Second",
        required: true,
        rules: [["first", equals("first")]],
      }),
    );
    const third = textField({
      name: "third",
      label: "Third",
      validators: [equals("third", "Custom message with %compare")],
    });
    form.add(third);

    /*const schema = generateComponentSchema(third);
    if (schema && schema.type === "string") {
      expect(schema.const).toBe("third");
    }*/

    expect(validate(form, { third: "third" }).valid).toBe(true);
    expect(validate(form, { third: "nope" }).valid).toBe(false);
    expect(validate(form, { first: "first", third: "third" }).valid).toBe(
      false,
    );
  });

  test("exists validator schema + validation", () => {
    const form = createForm();
    form.add(textField({ name: "first", label: "First" }));
    form.add(
      textField({
        name: "second",
        label: "Second",
        rules: [["first", exists()]],
      }),
    );
    const third = textField({
      name: "third",
      label: "Third",
      validators: [exists()],
    });
    form.add(third);

    const schema = generateComponentSchema(third);
    expect(schema).toBeDefined();
    /*if (schema && schema.type === "string") {
      expect(schema.minLength).toBe(1);
    }*/
    const fullSchema = generateSchema(form);
    expect(fullSchema.required).toContain("third");

    expect(validate(form, { third: "third" }).valid).toBe(true);
    expect(validate(form, { first: "whatever" }).valid).toBe(false);
  });

  test("and/or/not rules validation", () => {
    const andForm = createForm({
      first: textField({ label: "First" }),
      second: textField({ label: "Second" }),
      third: textField({
        label: "Third",
        required: true,
        rules: [
          and([
            ["first", equals("choice1")],
            ["second", equals("choice2")],
          ]),
        ],
      }),
    });
    expect(
      validate(andForm, { first: "choice1", second: "second" }).valid,
    ).toBe(true);
    expect(
      validate(andForm, { first: "choice1", second: "choice2" }).valid,
    ).toBe(false);

    const orForm = createForm({
      first: textField({ label: "First" }),
      second: textField({
        label: "Second",
        required: true,
        rules: [
          or([
            ["first", equals("choice1")],
            ["first", equals("choice2")],
          ]),
        ],
      }),
    });
    expect(validate(orForm, { first: "choice1" }).valid).toBe(false);
    expect(validate(orForm, { first: "choice3" }).valid).toBe(true);

    const notForm = createForm({
      first: textField({ label: "First" }),
      second: textField({
        required: true,
        label: "Second",
        rules: [not([["first", equals("first")]])],
      }),
    });
    expect(validate(notForm, { first: "first" }).valid).toBe(true);
    expect(validate(notForm, { first: "test" }).valid).toBe(false);
  });

  test("Multiple items schema and min/max items validation", () => {
    const multipleText = textField({
      multiple: true,
      name: "field1",
      label: "Text field 1",
      required: true,
      minItems: 2,
      maxItems: 4,
    });
    const form = createForm({
      field1: multipleText,
      not_multiple: textField({ label: "Not multiple" }),
    });
    /*const schema = generateSchema(form);
    expect(schema.properties.not_multiple.type).toBe("string");
    expect(schema.properties.field1.type).toBe("array");
    if (schema.properties.field1.type === "array") {
      expect((schema.properties.field1.items as SchemaProperty).type).toBe(
        "string",
      );
    }*/
    expect(
      validate(form, { field1: ["One", "Two"], not_multiple: "Text" }).valid,
    ).toBe(true);
    expect(validate(form, { field1: ["one"] }).valid).toBe(false);
    expect(
      validate(form, {
        field1: ["one", "two", "three", "four", "five"],
        not_multiple: "Text",
      }).valid,
    ).toBe(false);
  });

  test("Variants schema validation", () => {
    const form = createForm({
      text: textField({ label: "Text", required: true }),
      dependent: [
        [
          "text",
          equals("test"),
          textField({ label: "Dependent", required: true }),
        ],
        ["text", equals("test2"), textField({ label: "Not required" })],
      ],
      dependent2: [
        [
          "dependent",
          equals("test"),
          textField({ label: "Dependent on other" }),
        ],
        [
          "dependent",
          equals("test2"),
          textField({ label: "Dependent on other", required: true }),
        ],
        textField({ label: "Default dependent" }),
      ],
    });
    expect(validate(form, { text: "test" }).valid).toBe(false);
    expect(validate(form, { text: "test", dependent: "asdf" }).valid).toBe(
      true,
    );
    expect(validate(form, { text: "test2", dependent: 2 }).valid).toBe(false);
    expect(validate(form, { text: "test2", dependent: "asdf" }).valid).toBe(
      true,
    );
    expect(validate(form, { text: "test", dependent: "test2" }).valid).toBe(
      false,
    );
  });

  test("Email schema validation", () => {
    const email = emailField({
      name: "required_text",
      label: "Required text",
      required: true,
      validators: [],
    });
    const form = createForm();
    form.add(email);
    expect(validate(form, { required_text: "not-an-email" }).valid).toBe(false);
    expect(validate(form, { required_text: "test@example.com" }).valid).toBe(
      true,
    );
  });

  test("Serialized group field form", () => {
    const groupItem = group(
      { name: "group", label: "Group with fields" },
      {
        field1: textField({
          name: "field1",
          label: "Text field 1",
          required: true,
        }),
        field2: textField({
          name: "field2",
          label: "Text field 2",
          required: true,
        }),
      },
    );
    const form = createForm();
    form.add(groupItem);
    const serializedForm = serialize(form);
    const components = serializedForm.components.filter(
      (c) => !Array.isArray(c),
    ) as SerializedComponent[];

    expect(components[0].components).toBeDefined();
    if (components[0].components) {
      const groupComponents = components[0].components as SerializedComponent[];
      expect(groupComponents[0].type).toBe("text");
      expect(groupComponents[1].type).toBe("text");
    }

    const unserialized = unserialize(
      serializedForm,
      [groupType, textFieldType],
      [basic],
      [fieldsetWidgetType, groupWidgetType, textFieldWidgetType],
      [],
      [],
      [orType],
    );

    const unserializedComponents = !Array.isArray(unserialized.components[0])
      ? (unserialized.components[0].components as FormComponent[])
      : [];

    expect(unserializedComponents).toBeDefined();
    if (unserializedComponents) {
      expect(unserializedComponents[0].type.name).toBe("text");
      expect(unserializedComponents[1].type.name).toBe("text");
    }
  });
});
