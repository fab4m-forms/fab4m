<script lang="ts">
  import { createForm, textField, integerField, group } from "@fab4m/fab4m";
  import {
    StatefulFormView,
    FormProvider,
    allWidgetsRenderer,
  } from "@fab4m/svelte";

  export type Band = {
    name: string;
    info: { genre: string; active_since?: number };
    performances: Array<{ city: string; audience_count: number }>;
  };

  const form = createForm<Band>({
    name: textField({ label: "Band name" }),
    info: group(
      { label: "Band info" },
      {
        genre: textField({
          label: "Genre",
          description: "Genre",
          required: true,
        }),
        active_since: integerField({
          label: "Active since",
          description: "Enter the year from which the band has been active",
        }),
      },
    ),
    performances: group(
      { label: "Performances", multiple: true, minItems: 1 },
      {
        city: textField({
          label: "City",
          description: "Enter the city",
          required: true,
        }),
        audience_count: integerField({
          label: "People in the audience",
          required: true,
        }),
      },
    ),
  });

  let band = $state<Band | null>(null);

  form.onSubmit((e, submittedData) => {
    e.preventDefault();
    band = submittedData;
  });
</script>

<FormProvider renderer={allWidgetsRenderer}>
  <StatefulFormView {form} />
</FormProvider>

{#if band}
  <div class="result-card">
    <h4>{band.name}</h4>
    <dl>
      <dt>Genre</dt>
      <dd>{band.info.genre}</dd>
      <dt>Active since</dt>
      <dd>{band.info.active_since}</dd>
    </dl>
    <h5>Performances</h5>
    <ul>
      {#each band.performances as performance (performance)}
        <li>
          {performance.city} (audience: {performance.audience_count})
        </li>
      {/each}
    </ul>
  </div>
{/if}
