<script lang="ts">
  import type { WidgetProps } from "@fab4m/fab4m";
  import GroupChildren from "./GroupChildren.svelte";

  type Props<DataType = Record<string, unknown>> = WidgetProps<DataType, unknown>;

  let { component, theme, value, onChange, name, id, errors }: Props = $props();
</script>

{#if component.components}
  <div id={id} class={theme.classes.horizontalGroup}>
    <GroupChildren
      {component}
      {value}
      {onChange}
      {name}
      {id}
      {errors}
      {theme}
      wrapperClass={theme.classes.horizontalGroupComponentWrapper}
    />
  </div>
{/if}
