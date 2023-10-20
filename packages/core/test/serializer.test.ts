import {
  basic,
  createForm,
  maxLength,
  serialize,
  textAreaWidget,
  textField,
  textFieldType,
  textFieldWidget,
  maxLengthValidator,
  unserialize,
  equals,
  orType,
  or,
  allowedValues,
  allowedValuesValidator,
  equalsValidator,
  booleanField,
  checkboxWidget,
  textAreaWidgetType,
  textFieldWidgetType,
  tagsWidget,
  tagsWidgetType,
  checkboxWidgetType,
  booleanFieldType,
  SerializedComponent,
  FormComponent,
  SerializedRule,
} from "../src";
describe("Serializer", () => {
  const form = createForm();
  form.add(
    textField({
      name: "text",
      label: "Text field",
      required: true,
      widget: textFieldWidget(),
      validators: [],
    }),
  );
  form.add(
    textField({
      name: "textarea",
      label: "Textarea",
      widget: textAreaWidget(),
      required: false,
      rules: [
        ["text", equals("text")],
        or([
          ["text", allowedValues(["asdf", "asdf2"])],
          ["text", equals("text2")],
        ]),
      ],
      validators: [maxLength(5)],
    }),
  );
  form.add(
    booleanField({
      name: "bool",
      label: "Boolean",
      required: true,
      widget: checkboxWidget(),
      validators: [],
    }),
  );

  form.add(
    textField({
      name: "multiple",
      multiple: true,
      multipleWidget: tagsWidget(),
    }),
  );

  test("Serialize", () => {
    const serializedForm = serialize(form);
    expect(serializedForm.schemaParts).toHaveLength(1);
    const components = serializedForm.components as SerializedComponent[];
    expect(components[0].type).toBe("text");
    expect(components[0].widget.type).toBe("textfield");
    expect(components[1].type).toBe("text");
    expect(components[1].widget.type).toBe("textarea");
    expect(components[1].validators[0].type).toBe("maxLength");
    expect(components[1].validators[0].settings).toBe(5);
    expect(components[2].dataType).toBe("boolean");
    const rules = components[1].rules as SerializedRule[];
    if (Array.isArray(rules)) {
      expect(rules[0][0]).toBe("text");
      expect(rules[0][1].type).toBe("equals");
      expect((rules[0][1].settings as Record<string, unknown>).value).toBe(
        "text",
      );
    }
    expect(Array.isArray(rules[1])).toBe(false);
    const firstRule = rules[1] as any;
    if (!Array.isArray(firstRule)) {
      expect(firstRule.type).toBe("or");
      const groupRules = firstRule.rules;
      expect(groupRules[0][1].type).toBe("allowedValues");
      expect(groupRules[0][1].settings.values).toHaveLength(2);
      expect(groupRules[1][1].type).toBe("equals");
    }
    expect(components[3].multiple).toBe(true);
    expect(components[3].multipleWidget?.type).toBe("tags");
  });

  test("Remove unused members from form", () => {
    const serializedForm = serialize(form) as unknown;
    expect(
      (serializedForm as Record<string, unknown>).submitListeners,
    ).not.toBeDefined();
  });

  test("Unserialize", async () => {
    const serializedForm = serialize(form);
    const unserializedForm = unserialize(
      serializedForm,
      [textFieldType, booleanFieldType],
      [basic],
      [textAreaWidgetType, textFieldWidgetType, checkboxWidgetType],
      [tagsWidgetType],
      [maxLengthValidator, allowedValuesValidator, equalsValidator],
      [orType],
    );
    const components = unserializedForm.components as FormComponent[];
    expect(components[0].type.name).toBe("text");
    expect(components[0].widget.type.name).toBe("textfield");
    expect(components[1].widget.type.name).toBe("textarea");
    expect(components[1].validators[0].type.name).toBe("maxLength");
    expect(components[1].validators[0].settings).toBe(5);
    expect((components[1] as any).rules[0][1].type.name).toBe("equals");
    if (!Array.isArray(components[1].rules[1])) {
      expect(components[1].rules[1].type.name).toBe("or");
    }
    expect(components[3].multiple).toBe(true);
    expect(components[3].multipleWidget?.type.name).toBe("tags");
  });
});
