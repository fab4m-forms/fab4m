<script lang="ts">
  import { createForm, textField, minLength } from "@fab4m/fab4m";
  import {
    StatefulFormView,
    FormProvider,
    allWidgetsRenderer,
  } from "@fab4m/svelte";

  const form = createForm({
    longtext: textField({
      label: "Long text (at least 10 characters)",
      validators: [minLength(10)],
    }),
  });

  let longText = $state<string | undefined>(undefined);

  form.onSubmit((e, data) => {
    e.preventDefault();
    longText = data.longtext;
  });
</script>

<div>
  <FormProvider renderer={allWidgetsRenderer}>
    <StatefulFormView {form} />
  </FormProvider>
  {#if longText}
    <div>
      <strong>Your long text:</strong> {longText}
    </div>
  {/if}
</div>
