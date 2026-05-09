<script lang="ts">
  import type { URLFieldWidgetSettings, WidgetProps } from "@fab4m/fab4m";
  import Input from "../components/Input.svelte";

  type Props = WidgetProps<string, URLFieldWidgetSettings>;

  let { component, theme, settings, value, onChange, name, id, attributes, hideLabel, labels }: Props = $props();
</script>

<Input
  {component}
  {theme}
  {settings}
  {hideLabel}
  {labels}
  {value}
  {onChange}
  {name}
  {id}
  {attributes}
  type="url"
/>
