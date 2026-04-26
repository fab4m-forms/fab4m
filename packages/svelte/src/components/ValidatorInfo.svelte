<script lang="ts">
  import { FormComponent, Theme } from "@fab4m/fab4m";
  import { getFormRendererContext } from "../formrenderer";

  let {
    value,
    component,
    theme,
  }: {
    value: unknown;
    component: FormComponent;
    theme: Theme;
  } = $props();

  const { validatorComponents } = getFormRendererContext();
</script>

{#if validatorComponents}
  {@const hasValidators = component.validators.some(
    (v) => validatorComponents[v.type.name],
  )}
  {#if hasValidators}
    <div>
      {#each component.validators as v}
        {#if validatorComponents[v.type.name]}
          {@const Validator = validatorComponents[v.type.name]}
          <Validator {theme} {value} settings={v.settings} />
        {/if}
      {/each}
    </div>
  {/if}
{/if}
