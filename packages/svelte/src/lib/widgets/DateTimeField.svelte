<script lang="ts">
  import type { WidgetProps } from "@fab4m/fab4m";
  import Input from "../components/Input.svelte";

  type Props = WidgetProps<Date, undefined>;

  let {
    component,
    theme,
    settings,
    value,
    onChange,
    name,
    id,
    attributes,
    hideLabel,
    labels,
  }: Props = $props();

  let valueString = $derived(
    value ? value.toISOString().slice(0, 16) : "",
  );
</script>

<Input
  {component}
  {theme}
  {settings}
  {hideLabel}
  {labels}
  value={valueString}
  onChange={(v) => onChange(v ? new Date(v) : undefined)}
  {name}
  {id}
  {attributes}
  type="datetime-local"
/>