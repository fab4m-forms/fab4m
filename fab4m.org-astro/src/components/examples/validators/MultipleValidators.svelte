<script lang="ts">
  import { createForm, textField, minLength, allowedValues } from "@fab4m/fab4m";
  import {
    StatefulFormView,
    FormProvider,
    allWidgetsRenderer,
  } from "@fab4m/svelte";

  const form = createForm({
    longtext: textField({
      label:
        "Long text (at least 5 characters, valid Values: Water, Juice, Soda)",
      validators: [minLength(5), allowedValues(["Water", "Juice", "Soda"])],
    }),
  });

  let drink = $state<string | undefined>(undefined);

  form.onSubmit((e, data) => {
    e.preventDefault();
    drink = data.longtext;
  });
</script>

<div>
  <FormProvider renderer={allWidgetsRenderer}>
    <StatefulFormView {form} />
  </FormProvider>
  {#if drink}
    <div>
      <strong>Your drink:</strong> {drink}
    </div>
  {/if}
</div>
