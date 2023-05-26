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
    })
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
    })
  );
  form.add(
    booleanField({
      name: "bool",
      label: "Boolean",
      required: true,
      widget: checkboxWidget(),
      validators: [],
    })
  );

  form.add(
    textField({
      name: "multiple",
      multiple: true,
      multipleWidget: tagsWidget(),
    })
  );

  test("Serialize", () => {
    const serializedForm = serialize(form);
    expect(serializedForm.schemaParts).toHaveLength(1);
    expect(serializedForm.components[0].type).toBe("text");
    expect(serializedForm.components[0].widget.type).toBe("textfield");
    expect(serializedForm.components[1].type).toBe("text");
    expect(serializedForm.components[1].widget.type).toBe("textarea");
    expect(serializedForm.components[1].validators[0].type).toBe("maxLength");
    expect(serializedForm.components[1].validators[0].settings).toBe(5);
    expect(serializedForm.components[2].dataType).toBe("boolean");
    const rules = serializedForm.components[1].rules;
    expect(rules[0][0]).toBe("text");
    expect(rules[0][1].type).toBe("equals");
    expect(rules[0][1].settings.value).toBe("text");
    expect(Array.isArray(rules[1])).toBe(false);
    if (!Array.isArray(rules[1])) {
      expect(rules[1].type).toBe("or");
      const groupRules = rules[1].rules;
      expect(groupRules[0][1].type).toBe("allowedValues");
      expect(groupRules[0][1].settings.values).toHaveLength(2);
      expect(groupRules[1][1].type).toBe("equals");
    }
    expect(serializedForm.components[3].multiple).toBe(true);
    expect(serializedForm.components[3].multipleWidget?.type).toBe("tags");
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
      [orType]
    );
    expect(unserializedForm.components[0].type.name).toBe("text");
    expect(unserializedForm.components[0].widget.type.name).toBe("textfield");
    expect(unserializedForm.components[1].widget.type.name).toBe("textarea");
    expect(unserializedForm.components[1].validators[0].type.name).toBe(
      "maxLength"
    );
    expect(unserializedForm.components[1].validators[0].settings).toBe(5);
    expect(unserializedForm.components[1].rules[0][1].type.name).toBe("equals");
    if (!Array.isArray(unserializedForm.components[1].rules[1])) {
      expect(unserializedForm.components[1].rules[1].type.name).toBe("or");
    }
    expect(unserializedForm.components[3].multiple).toBe(true);
    expect(unserializedForm.components[3].multipleWidget?.type.name).toBe(
      "tags"
    );
  });
});
