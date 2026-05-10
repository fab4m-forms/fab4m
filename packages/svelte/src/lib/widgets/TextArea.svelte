<script lang="ts">
  import type { WidgetProps } from "@fab4m/fab4m";
  import FormComponentWrapper from "../components/FormComponentWrapper.svelte";

  type Props = WidgetProps<string, unknown>;

  let { component, theme, value, onChange, name, id, attributes, hideLabel, labels }: Props = $props();
  let classes = $derived(theme.classes);
</script>

<FormComponentWrapper
  {component}
  {theme}
  {hideLabel}
  {labels}
  {name}
  {id}
  {attributes}
>
  <textarea
    class={classes.textarea}
    required={component.required}
    {value}
    disabled={component.disabled}
    oninput={(e) => onChange(e.currentTarget.value)}
    {name}
    {id}
    {...attributes}
  ></textarea>
</FormComponentWrapper>
