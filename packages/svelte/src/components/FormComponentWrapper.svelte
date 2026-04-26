<script lang="ts">
  import { WidgetProps } from "@fab4m/fab4m";
  import FormElement from "./FormElement.svelte";

  type Props = Omit<WidgetProps<any, any>, "onChange"> & {
    id?: string;
    label?: string;
    prefix?: string;
  };

  let {
    component,
    theme,
    hideLabel,
    labels,
    name,
    id,
    label,
    prefix,
  }: Props = $props();

  const classes = $derived(theme.classes);
  const elementId = $derived(id ? id : name);
  const elementLabel = $derived(
    !hideLabel ? (label ?? component.label) : undefined,
  );
  const childrenClass = $derived(
    prefix ? classes.prefixedElementWrapper : classes.elementWrapper,
  );
</script>

<FormElement
  id={elementId}
  label={elementLabel}
  required={component.required}
  requiredText={labels?.required ?? "Required"}
  requiredClass={classes.requiredIndicator}
  labelClass={classes.label}
  labelWrapperClass={classes.labelWrapper}
  {childrenClass}
>
  {#if prefix}
    <div class={classes.inputPrefixWrapper}>
      <div class={classes.inputPrefix}>{prefix}</div>
    </div>
  {/if}
  <slot />
</FormElement>
