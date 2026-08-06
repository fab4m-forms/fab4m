<script lang="ts">
  import { createForm, dateField, datePickerWidget } from "@fab4m/fab4m";
  import {
    StatefulFormView,
    FormProvider,
    allWidgetsRenderer,
  } from "@fab4m/svelte";

  const form = createForm({
    birthday: dateField({
      label: "Your birthday",
      widget: datePickerWidget(),
    }),
  });
</script>

<FormProvider renderer={allWidgetsRenderer}>
  <StatefulFormView {form} hideSubmit={true} />
</FormProvider>