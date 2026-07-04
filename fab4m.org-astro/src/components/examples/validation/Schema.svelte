<script lang="ts">
  import {
    createForm,
    textField,
    integerField,
    minLength,
    allowedValues,
    generateSchema,
    booleanField,
    group,
  } from "@fab4m/fab4m";

  const form = createForm({
    username: textField({ required: true, validators: [minLength(5)] }),
    age: integerField({ label: "Username" }),
    city: textField({
      required: true,
      validators: [allowedValues(["Gothenburg", "Stockholm"])],
    }),
    vegetarian: booleanField({ label: "Vegetarian" }),
    interests: textField({ label: "Interests", multiple: true, minItems: 2 }),
    profession: group(
      { label: "Profession" },
      {
        workplace: textField({ label: "Workplace" }),
        label: textField({ label: "Title" }),
      },
    ),
  });

  const schema = generateSchema(form);
</script>

<div style="max-height: 300px; overflow-y: scroll;">
  <pre>{JSON.stringify(schema, null, 2)}</pre>
</div>
