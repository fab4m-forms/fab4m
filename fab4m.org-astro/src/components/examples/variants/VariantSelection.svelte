<script lang="ts">
  import {
    booleanField,
    textField,
    equals,
    createForm,
    selectWidget,
  } from "@fab4m/fab4m";
  import {
    StatefulFormView,
    FormProvider,
    allWidgetsRenderer,
  } from "@fab4m/svelte";

  const form = createForm({
    city: textField({
      label: "Select your city",
      widget: selectWidget(["London", "Paris", "New york"]),
    }),
    attractions: [
      // This variant is defined like a rule. If the rule is true,
      // then the variant is activated.
      [
        "city",
        equals("Paris"),
        booleanField({
          label: "I visited the eiffel tower",
          required: true,
        }),
      ],
      [
        "city",
        equals("London"),
        booleanField({
          label: "I visited Buckinghamn palace",
          required: true,
        }),
      ],
      [
        "city",
        equals("New york"),
        booleanField({
          label: "I visited the statue of liberty",
          required: true,
        }),
      ],
    ],
  });
</script>

<FormProvider renderer={allWidgetsRenderer}>
  <StatefulFormView {form} hideSubmit={true} />
</FormProvider>
