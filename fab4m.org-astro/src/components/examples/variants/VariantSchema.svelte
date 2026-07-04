<script lang="ts">
  import {
    textField,
    equals,
    createForm,
    selectWidget,
    group,
    generateSchema,
  } from "@fab4m/fab4m";
  import {
    StatefulFormView,
    FormProvider,
    allWidgetsRenderer,
  } from "@fab4m/svelte";

  const form = createForm({
    transport: textField({
      label: "How do you get to work?",
      required: true,
      widget: selectWidget(["Car", "Public transport"]),
    }),

    questions: [
      [
        "transport",
        equals("Car"),
        group(
          { label: "Questions" },
          {
            car: textField({
              label: "What type of car do you have?",
              required: true,
            }),
          },
        ),
      ],
      [
        "transport",
        equals("Public transport"),
        group(
          { label: "Questions" },
          {
            publicTransport: textField({
              label: "What type of public transport do you use?",
              required: true,
            }),
          },
        ),
      ],
    ],
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
