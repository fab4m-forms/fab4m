<script lang="ts">
  import { createForm, textField } from "@fab4m/fab4m";
  import {
    StatefulFormView,
    FormProvider,
    allWidgetsRenderer,
  } from "@fab4m/svelte";

  type Party = {
    foods: string[];
    allergies: string[];
  };

  const form = createForm<Party>({
    foods: textField({
      label: "What would you like to eat?",
      minItems: 2,
      maxItems: 4,
      multiple: true,
      required: true,
    }),
    allergies: textField({
      label: "Specify your allergies",
      description: "Specify any allergies you have.",
      multiple: true,
    }),
  });

  let data = $state<Party | null>(null);

  form.onSubmit((e, submittedData) => {
    e.preventDefault();
    data = submittedData;
  });
</script>

<FormProvider renderer={allWidgetsRenderer}>
  <StatefulFormView {form} />
</FormProvider>

{#if data}
  <div class="result-card">
    <div>
      <strong>Your food selection</strong>
      <ul>
        {#each data.foods as food, i (i)}
          <li>{food}</li>
        {/each}
      </ul>
    </div>
    <div>
      <strong>Allergies</strong>
      <ul>
        {#each data.allergies ?? [] as allergy, i (i)}
          <li>{allergy}</li>
        {/each}
      </ul>
    </div>
  </div>
{/if}
