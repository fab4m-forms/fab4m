<script lang="ts">
  import { createForm, dateTimeField } from "@fab4m/fab4m";
  import {
    StatefulFormView,
    FormProvider,
    allWidgetsRenderer,
  } from "@fab4m/svelte";

  const form = createForm({
    appointment: dateTimeField({
      label: "Your appointment time",
    }),
  });

  let result: { appointment?: Date } | null = null;
  form.onSubmit((e, data) => {
    e.preventDefault();
    result = data;
  });
</script>

<FormProvider renderer={allWidgetsRenderer}>
  <StatefulFormView {form} />
</FormProvider>

{#if result}
  <p>Your appointment is {result.appointment?.toLocaleString()}</p>
{/if}