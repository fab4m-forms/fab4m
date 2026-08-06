<script lang="ts">
  import {
    createForm,
    dateTimeField,
    dateTimePickerWidget,
  } from "@fab4m/fab4m";
  import {
    StatefulFormView,
    FormProvider,
    allWidgetsRenderer,
  } from "@fab4m/svelte";

  const form = createForm({
    appointment: dateTimeField({
      label: "Your appointment time",
      widget: dateTimePickerWidget(),
    }),
  });
</script>

<FormProvider renderer={allWidgetsRenderer}>
  <StatefulFormView {form} hideSubmit={true} />
</FormProvider>