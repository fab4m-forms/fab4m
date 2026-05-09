<script lang="ts">
  import { optionValue } from "@fab4m/fab4m";
  import type { Option, WidgetProps } from "@fab4m/fab4m";
  import FormComponentWrapper from "../components/FormComponentWrapper.svelte";

  type Props<OptionsType extends string | number = string | number> = WidgetProps<OptionsType, Option<OptionsType>[]>;

  let { component, theme, settings, value, onChange, name, id, attributes, hideLabel, labels }: Props = $props();

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
  <div class={classes.radiosWrapper}>
    {#each settings as option, index}
      {@const optionId = `${id}-${index}`}
      {@const optionVal = optionValue(option) as Props["value"]}
      {@const elementValue = typeof optionVal === "string" || typeof optionVal === "number" ? optionVal : undefined}
      <label class={classes.radioWrapper} for={optionId}>
        <input
          type="radio"
          id={optionId}
          {name}
          value={elementValue}
          onchange={() => onChange(optionVal)}
          checked={value === optionVal}
        />
        {Array.isArray(option) ? option[0] : option}
      </label>
    {/each}
  </div>
</FormComponentWrapper>
