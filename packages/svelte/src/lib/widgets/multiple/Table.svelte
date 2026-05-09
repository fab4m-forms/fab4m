<script lang="ts">
  import {
    componentErrors,
    filterComponents,
  } from "@fab4m/fab4m";
  import type {
    FormComponentVariant,
    Labels,
    MultipleWidgetProps,
    TableSettings,
    Theme,
    FormComponent,
  } from "@fab4m/fab4m";
  import { getFormDataContext } from "../../context.js";
  import FormComponentView from "../../components/FormComponentView.svelte";
  import ValidationErrors from "../../components/ValidationErrors.svelte";

  type Props = MultipleWidgetProps<unknown, TableSettings> & {
    hideLabel?: boolean;
  };

  let { component, theme, settings, value, onChange, name, id, errors, ssr, labels, hideLabel, attributes }: Props = $props();

  let formData = getFormDataContext();

  let items = $derived((value ?? []) as Array<Record<string, unknown>>);

  let addItem = () => onChange([...items, {}]);

  let removeValue = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    onChange(newItems);
  };

  let changeChildValue = (index: number, childName: string, newValue: unknown) => {
    const newItems = [...items];
    newItems[index] = {
      ...items[index],
      [childName]: newValue,
    };
    onChange(newItems);
  };
</script>

<div class={theme.classes.componentWrapper}>
  {#if !hideLabel}
    <label class={theme.classes.label} for={id}>{component.label}</label>
  {/if}
  {#if items.length > 0}
    <table class={theme.classes.table}>
      <thead>
        <tr class={theme.classes.headTr}>
          {#each component.components ?? [] as comp, i}
            {@const colComponent = Array.isArray(comp) ? comp[0].component : comp}
            <th class={theme.classes.th}>
              <span id={`label-${colComponent.name}`}>{colComponent.label}</span>
              {#if colComponent.required}
                <span class={theme.classes.requiredIndicator} aria-label={labels?.required}>*</span>
              {/if}
            </th>
          {/each}
          <th class={theme.classes.operationsTh}></th>
        </tr>
      </thead>
      <tbody>
        {#each items as itemValue, index}
          {@const components = filterComponents(component.components ?? [], formData, false, itemValue)}
          <tr class={theme.classes.tr}>
            {#each component.components ?? [] as comp, colIndex}
              {@const colComponent = Array.isArray(comp) ? comp[0].component : comp}
              {@const match = components.find((c) => c.name === colComponent.name)}
              <td class={theme.classes.td}>
                {#if match}
                  <FormComponentView
                    value={itemValue[match.name]}
                    hideLabel={true}
                    attributes={{ "aria-labelledby": `label-${colComponent.name}` }}
                    name={`${name}[${index}][${colComponent.name}]`}
                    errors={errors && componentErrors(`/${index}`, errors)}
                    {theme}
                    {ssr}
                    onChange={(val) => changeChildValue(index, colComponent.name ?? "", val)}
                    component={match as never}
                  />
                {/if}
              </td>
            {/each}
            <td class={theme.classes.operationsTd}>
              {#if !component.disabled}
                <button
                  class={theme.classes.removeItem}
                  type="button"
                  onclick={() => removeValue(index)}
                >
                  {settings.removeItemLabel ?? "Remove"}
                </button>
              {/if}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
  {#if !component.disabled && (!component.maxItems || component.maxItems > items.length)}
    <button
      type="button"
      onclick={addItem}
      id={`${id}-add`}
      class={theme.classes.addItem}
    >
      {settings.addItemLabel ?? "Add"}
    </button>
  {/if}
  {#if component.description}
    <div class={theme.classes.description}>
      {component.description}
    </div>
  {/if}
  {#if errors}
    <ValidationErrors errors={errors} classes={theme.classes} />
  {/if}
</div>
