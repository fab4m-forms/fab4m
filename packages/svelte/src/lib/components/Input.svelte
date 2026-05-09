<script lang="ts">
  /**
   * @internal
   */
  import type { WidgetProps } from "@fab4m/fab4m";
  import FormComponentWrapper from "./FormComponentWrapper.svelte";

  type Props = Partial<Pick<WidgetProps<string, any>, "settings" | "ssr">> &
    Omit<WidgetProps<string, { prefix?: string } | undefined>, "settings" | "ssr"> & {
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
