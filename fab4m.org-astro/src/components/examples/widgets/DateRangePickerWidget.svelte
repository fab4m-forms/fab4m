<script lang="ts">
  import { createForm, dateRangeField, dateRangePickerWidget } from "@fab4m/fab4m";
  import {
    StatefulFormView,
    FormProvider,
    allWidgetsRenderer,
  } from "@fab4m/svelte";

  const form = createForm({
    vacation: dateRangeField({
      label: "Enter your desired vacation",
      widget: dateRangePickerWidget({
        fromLabel: "Start",
        toLabel: "End",
        optionalEndDate: true,
      }),
    }),
  });
</script>

<FormProvider renderer={allWidgetsRenderer}>
  <StatefulFormView {form} hideSubmit={true} />
</FormProvider>