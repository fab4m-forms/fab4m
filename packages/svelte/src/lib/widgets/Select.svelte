<script lang="ts">
  import {
    isOptionGroup,
    optionValue,
  } from "@fab4m/fab4m";
  import type {
    Option,
    OptionGroup,
    SelectWidgetSettings,
    WidgetProps,
  } from "@fab4m/fab4m";
  import FormComponentWrapper from "../components/FormComponentWrapper.svelte";

  type OptionValue = string | number;
  type Props<OptionsType extends OptionValue = OptionValue> = WidgetProps<OptionsType, SelectWidgetSettings<OptionsType>>;

  let { component, theme, settings, value, onChange, name, id, attributes, hideLabel, labels }: Props = $props();

  let classes = $derived(theme.classes);

  let change = (e: Event) => {
    const target = e.target as HTMLSelectElement;
    let newValue: OptionValue;
    switch (component.type.dataType) {
      case "integer":
        newValue = parseInt(target.value, 10);
        break;
      case "float":
        newValue = parseFloat(target.value);
        break;
      default:
        newValue = target.value;
    }
    onChange(newValue as Props["value"]);
  };
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
  <div class={theme.classes.selectWrapper}>
    <select
      class={classes.select}
      value={typeof value === "undefined" ? "" : value}
      {id}
      {name}
      required={component.required}
      disabled={component.disabled}
      onchange={change}
      {...attributes}
    >
      <option value="">
        {settings.notSelectedLabel ?? "- Select -"}
      </option>
      {#each settings.options as option, index}
        {#if isOptionGroup(option)}
          <optgroup label={option[0]}>
            {#each option[1] as childOption, childIndex}
              {@const opt = childOption as Option<OptionValue>}
              <option value={optionValue(opt)}>
                {Array.isArray(opt) ? opt[0] : opt}
              </option>
            {/each}
          </optgroup>
        {:else}
          <option value={optionValue(option)}>
            {Array.isArray(option) ? option[0] : option}
          </option>
        {/if}
      {/each}
    </select>
  </div>
</FormComponentWrapper>
