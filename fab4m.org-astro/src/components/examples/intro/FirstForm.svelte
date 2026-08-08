<script lang="ts">
  import { createForm, textField } from "@fab4m/fab4m";
  import { StatefulFormView, FormProvider, allWidgetsRenderer } from "@fab4m/svelte";

  const form = createForm({
    name: textField({
      label: "Your name",
    }),
  });
</script>

<FormProvider renderer={allWidgetsRenderer}>
  <StatefulFormView {form} />
</FormProvider>
