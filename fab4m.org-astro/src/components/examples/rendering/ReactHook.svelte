<script lang="ts">
  import { textField, createForm } from "@fab4m/fab4m";
  import {
    StatefulFormView,
    FormProvider,
    allWidgetsRenderer,
  } from "@fab4m/svelte";

  // In Svelte the component script runs once per instance, so it's safe to
  // create the form directly here without any special hook.
  const form = createForm({
    text: textField({ label: "text field" }),
  });
</script>

<FormProvider renderer={allWidgetsRenderer}>
  <StatefulFormView {form} />
</FormProvider>
