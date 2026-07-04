<script lang="ts">
  import {
    textField,
    integerField,
    booleanField,
    equals,
    max,
    createForm,
  } from "@fab4m/fab4m";
  import {
    StatefulFormView,
    FormProvider,
    allWidgetsRenderer,
  } from "@fab4m/svelte";

  const form = createForm({
    city: textField({ label: "City" }),
    inCityCenter: booleanField({ label: "Do you live in the city center?" }),
    streetCars: booleanField({
      label: "Do you use street cars?",
      rules: [
        ["city", equals("Gothenburg")],
        ["inCityCenter", equals(true)],
      ],
    }),
    subway: booleanField({
      label: "Do you use the subway?",
      rules: [["city", equals("Stockholm")]],
    }),
    usage: integerField({
      label: "How may times do you use public transport per week?",
    }),
    expensive: booleanField({
      label: "Do you think public transport is too expensive?",
      rules: [["usage", max(3)]],
    }),
  });
</script>

<FormProvider renderer={allWidgetsRenderer}>
  <StatefulFormView {form} hideSubmit={true} />
</FormProvider>
