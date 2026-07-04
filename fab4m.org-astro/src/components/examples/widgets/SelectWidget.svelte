<script lang="ts">
  import { createForm, textField, selectWidget } from "@fab4m/fab4m";
  import {
    StatefulFormView,
    FormProvider,
    allWidgetsRenderer,
  } from "@fab4m/svelte";

  const form = createForm({
    textSelect: textField({
      label: "Select",
      widget: selectWidget([["One", "one"], ["Two", "two"], "three"]),
    }),
  });
</script>

<FormProvider renderer={allWidgetsRenderer}>
  <StatefulFormView {form} hideSubmit={true} />
</FormProvider>
