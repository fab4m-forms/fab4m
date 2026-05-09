<script lang="ts">
  import type { WidgetProps } from "@fab4m/fab4m";
  import Input from "../components/Input.svelte";

  type Props = WidgetProps<string, unknown | undefined>;

  let { component, theme, settings, value, onChange, name, id, attributes, hideLabel, labels }: Props = $props();
</script>

<Input
  {component}
  {theme}
  {hideLabel}
  {labels}
  {value}
  {onChange}
  {name}
  {id}
  {attributes}
  type="email"
/>
