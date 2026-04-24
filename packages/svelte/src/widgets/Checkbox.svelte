<script lang="ts">
  /**
   * A checkbox react component.
   * @group Svelte widgets
   */
  import { WidgetProps } from "@fab4m/fab4m";
  let {
    component,
    id,
    theme,
    hideLabel,
    value,
    onChange,
    name,
    attributes,
  }: WidgetProps<boolean, undefined> = $props();
  let classes = $derived(theme.classes);
</script>

<div class={classes.elementWrapper}>
  <label for={id} class={classes.checkboxWrapper}>
    <input
      type="checkbox"
      class={classes.checkboxInput}
      required={component.required}
      bind:checked={() => value, (v) => onChange(v)}
      value={1}
      disabled={component.disabled}
      {name}
      {id}
      {...attributes}
    />
    {#if !hideLabel}<span> {component.label}</span>}{/if}
  </label>
</div>
