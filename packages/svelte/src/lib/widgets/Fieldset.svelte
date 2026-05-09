<script lang="ts">
  import type { WidgetProps } from "@fab4m/fab4m";
  import GroupChildren from "./GroupChildren.svelte";

  type Props<DataType = Record<string, unknown>> = WidgetProps<DataType, unknown>;

  let { component, theme, value, onChange, name, id, errors }: Props = $props();
</script>

{#if component.components}
  <fieldset id={id} class={theme.classes.fieldset}>
    <legend class={theme.classes.fieldsetLegend}>
      {component.label}
    </legend>
    <GroupChildren {component} {value} {onChange} {name} {id} {errors} {theme} />
  </fieldset>
{/if}
