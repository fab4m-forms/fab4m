<script lang="ts">
  import { textField, createForm } from "@fab4m/fab4m";
  import { FormView, FormProvider, allWidgetsRenderer } from "@fab4m/svelte";

  const form = createForm({
    text: textField({ label: "Text field" }),
  });
</script>

<FormProvider renderer={allWidgetsRenderer}>
  <FormView {form} data={{ text: "Some text" }} />
</FormProvider>
