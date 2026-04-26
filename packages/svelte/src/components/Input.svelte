<script lang="ts">
  /**
   * @internal
   */
  import { WidgetProps } from "@fab4m/fab4m";
  import FormComponentWrapper from "./FormComponentWrapper.svelte";

  type Props = WidgetProps<string, { prefix?: string } | undefined> & {
    type: string;
  };

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
    type,
  }: Props = $props();

  let classes = $derived(theme.classes);
</script>

<FormComponentWrapper
  {component}
  {theme}
  {hideLabel}
  {labels}
  {name}
  {id}
  prefix={settings?.prefix}
>
  <input
    {type}
    class={classes.input}
    required={component.required}
    disabled={component.disabled}
    value={value ?? ""}
    oninput={(e) => onChange(e.currentTarget.value)}
    {name}
    {id}
    {...attributes}
  />
</FormComponentWrapper>
