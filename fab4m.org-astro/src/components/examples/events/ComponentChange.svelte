<script lang="ts">
  import { createForm, integerField } from "@fab4m/fab4m";
  import {
    StatefulFormView,
    FormProvider,
    allWidgetsRenderer,
  } from "@fab4m/svelte";

  const ageForm = createForm({
    age: integerField({ label: "Age" }),
  });

  let age = $state<number | undefined>(undefined);

  ageForm.onComponentChange((name, value) => {
    if (name === "age") {
      age = value;
    }
  });
</script>

<FormProvider renderer={allWidgetsRenderer}>
  <StatefulFormView form={ageForm} hideSubmit={true} />
</FormProvider>

{#if age}
  <p style="font-weight: bold;">You are {age} years old</p>
{/if}
