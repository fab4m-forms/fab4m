<script lang="ts">
  import type { NumberWidgetSettings, WidgetProps } from "@fab4m/fab4m";
  import FormComponentWrapper from "../components/FormComponentWrapper.svelte";

  type Props = WidgetProps<number, NumberWidgetSettings>;

  let { component, theme, settings, value, onChange, name, id, attributes, hideLabel, labels }: Props = $props();

  let classes = $derived(theme.classes);

  let convertValue = (val: string) => {
    return component.type.dataType === "float"
      ? parseFloat(val)
      : parseInt(val, 10);
  };

  let draft = $state<string | undefined>(value?.toString());

  $effect(() => {
    draft = value?.toString();
  });

  let changeValue = (e: Event) => {
    const target = e.target as HTMLInputElement;
    draft = target.value;
    const newValue = convertValue(target.value);
    if (!isNaN(newValue)) {
      onChange(newValue);
    }
  };
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
    class={classes.input}
    required={component.required}
    value={draft ?? ""}
    disabled={component.disabled}
    oninput={changeValue}
    {name}
    {id}
    type="number"
    step={component.type.dataType === "float" ? "any" : undefined}
    {...attributes}
  />
</FormComponentWrapper>
