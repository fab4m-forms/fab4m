<script lang="ts">
  import { createForm, dateField } from "@fab4m/fab4m";
  import {
    StatefulFormView,
    FormProvider,
    allWidgetsRenderer,
  } from "@fab4m/svelte";

  const form = createForm({
    birthday: dateField({
      label: "Your birthday",
    }),
  });

  let result: { birthday?: Date } | null = null;
  form.onSubmit((e, data) => {
    e.preventDefault();
    result = data;
  });
</script>

<FormProvider renderer={allWidgetsRenderer}>
  <StatefulFormView {form} />
</FormProvider>

{#if result}
  <p>Your birthday is {result.birthday?.toLocaleDateString()}</p>
{/if}