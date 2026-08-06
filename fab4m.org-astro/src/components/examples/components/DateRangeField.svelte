<script lang="ts">
  import { createForm, dateRangeField } from "@fab4m/fab4m";
  import {
    StatefulFormView,
    FormProvider,
    allWidgetsRenderer,
  } from "@fab4m/svelte";

  const form = createForm({
    vacation: dateRangeField({
      label: "Enter your desired vacation",
    }),
  });

  let result: { vacation?: { from: Date; to?: Date } } | null = null;
  form.onSubmit((e, data) => {
    e.preventDefault();
    result = data;
  });
</script>

<FormProvider renderer={allWidgetsRenderer}>
  <StatefulFormView {form} />
</FormProvider>

{#if result}
  <p>
    Your vacation is {result.vacation?.from.toLocaleDateString()} -{" "}
    {result.vacation?.to.toLocaleDateString()}
  </p>
{/if}