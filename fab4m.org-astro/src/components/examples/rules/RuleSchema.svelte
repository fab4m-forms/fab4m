<script lang="ts">
  import {
    textField,
    equals,
    generateSchema,
    createForm,
    booleanField,
  } from "@fab4m/fab4m";
  import {
    StatefulFormView,
    FormProvider,
    allWidgetsRenderer,
  } from "@fab4m/svelte";

  const form = createForm({
    city: textField({ label: "City" }),
    streetCars: booleanField({
      label: "Do you use street cars?",
      required: true,
      rules: [["city", equals("Gothenburg")]],
    }),
  });

  let schema = $state(generateSchema(form));

  form.onDataChange((data) => {
    schema = generateSchema(form, data);
  });
</script>

<div>
  <FormProvider renderer={allWidgetsRenderer}>
    <StatefulFormView {form} hideSubmit={true} />
  </FormProvider>
  <h4>Here's the schema:</h4>
  <pre>{JSON.stringify(schema, null, 2)}</pre>
</div>
