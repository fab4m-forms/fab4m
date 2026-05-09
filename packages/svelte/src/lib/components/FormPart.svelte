<script lang="ts">
  import {
    componentErrors,
    filterComponents,
    filterData,
    Form,
  } from "@fab4m/fab4m";
  import type {
    FormComponentWithName,
    ValidationError,
  } from "@fab4m/fab4m";
  import FormComponentView from "./FormComponentView.svelte";

  type Props = {
    /** The form to render */
    form: Form;
    /** The whole part will be rendered with `display: none` if this is set to true*/
    hide: boolean;
    /** A prefix to use for all ids */
    idPrefix?: string;
    /** A list of validation errors to pass to the components. */
    errors: ValidationError[];
    /** The current data in the form. */
    data: Record<string, unknown>;
    /** Set to true to optimize for server side rendering.*/
    ssr: boolean;
    /** A list of components within the form part to render*/
    components: FormComponentWithName[];
  };

  let { form, hide, idPrefix, errors, data, ssr, components }: Props = $props();

  const changeComponent = (name: string, value: unknown) => {
    const newData = { ...data, [name]: value };
    const filteredData = filterData(components, newData);
    form.triggerChangeComponent(name, value);
    form.triggerChangeData(filteredData);
  };

  const visibleComponents = $derived(filterComponents(components, data));
</script>

<div
  class={form.theme.classes.formPart}
  style:display={hide ? "none" : "block"}
>
  {#each visibleComponents as component, index}
    {#if component.name}
      <FormComponentView
        value={data[component.name]}
        {ssr}
        errors={componentErrors(`/${component.name}`, errors)}
        {component}
        id={idPrefix ? idPrefix + component.name : undefined}
        name={component.name}
        theme={form.theme}
        onChange={(value) =>
          component.name && changeComponent(component.name, value)}
      />
    {/if}
  {/each}
</div>
