<script lang="ts">
  import { componentErrors, filterComponents, WidgetProps } from "@fab4m/fab4m";
  import { getFormDataContext } from "../context";
  import FormComponentView from "../components/FormComponentView";
  const {
    value,
    component,
    onChange,
    name,
    id,
    errors,
    theme,
  }: WidgetProps<Record<string, unknown>, unknown> & {
    wrapperClass?: string;
  } = $props();
  const formData = getFormDataContext();
  const children = $derived.by(() =>
    filterComponents(component.components, formData, false, value),
  );
  const changeChildValue = (name: string, newValue: unknown) => {
    onChange({
      ...value,
      [name]: newValue,
    });
  };
</script>

{#each children as child}
  {#if child.name}
    <FormComponentView
      value={value && value[child.name] ? value[child.name] : undefined}
      name={`${name}[${child.name}]`}
      id={`${id}_${child.name}`}
      component={child}
      errors={errors && componentErrors(`/${child.name}`, errors)}
      onChange={(changedValue) =>
        child.name && changeChildValue(child.name, changedValue)}
      {theme}
    />
  {/if}
{/each}
