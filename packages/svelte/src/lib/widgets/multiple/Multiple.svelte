<script lang="ts">
  import {
    componentErrors,
  } from "@fab4m/fab4m";
  import type {
    MultipleSettings,
    MultipleWidgetProps,
  } from "@fab4m/fab4m";
  import FormComponentView from "../../components/FormComponentView.svelte";
  import ValidationErrors from "../../components/ValidationErrors.svelte";

  let props: MultipleWidgetProps<unknown, MultipleSettings | undefined> =
    $props();

  function defaultItems(component: { minItems?: number }): unknown[] {
    const noItems = component.minItems ?? 0;
    const values: unknown[] = [];
    for (let i = 0; i < noItems; i++) {
      values.push(undefined);
    }
    return values;
  }

  let items = $state<Array<unknown>>(
    props.value ?? defaultItems(props.component),
  );

  $effect(() => {
    items = props.value ?? defaultItems(props.component);
  });

  function addItem() {
    const newItems = [...items, undefined];
    items = newItems;
    props.onChange(newItems);
  }

  function changeValue(index: number, changed: unknown) {
    const newItems = [...items];
    newItems.splice(index, 1, changed);
    items = newItems;
    props.onChange(newItems);
  }

  function removeValue(index: number) {
    const newItems = [...items];
    newItems.splice(index, 1);
    items = newItems;
    props.onChange(newItems);
  }
</script>

<div class={props.theme.classes.multipleItems}>
  {#if !props.settings?.multipleLabels}
    <label class={props.theme.classes.label} id={`${props.id}-label`}>
      {props.component.label}
    </label>
  {/if}

  {#each items as value, index}
    <div class={props.theme.classes.multipleItem}>
      <div class={props.theme.classes.multipleItemWrapper}>
        <FormComponentView
          theme={props.theme}
          component={props.component}
          {value}
          {index}
          errors={props.errors && componentErrors(`/${index}`, props.errors)}
          hideLabel={!props.settings?.multipleLabels}
          hideDescription={true}
          id={props.id
            ? `${props.id}-${index}`
            : `${props.component.name}-${index}`}
          attributes={!props.settings?.multipleLabels
            ? { "aria-labelledby": `${props.id}-label` }
            : undefined}
          name={props.name
            ? `${props.name}[${index}]`
            : `${props.component.name}[${index}]`}
          onChange={(v) => changeValue(index, v)}
        />
      </div>
      {#if !props.component.minItems || props.component.minItems < items.length}
        <div class={props.theme.classes.multipleActions}>
          <button
            class={props.theme.classes.removeItem}
            type="button"
            onclick={() => removeValue(index)}
          >
            {props.settings?.removeItemLabel ?? "Remove"}
          </button>
        </div>
      {/if}
    </div>
  {/each}

  {#if !props.component.maxItems || props.component.maxItems > items.length}
    <button
      type="button"
      onclick={addItem}
      id={`${props.id}-add`}
      class={props.theme.classes.addItem}
    >
      {props.settings?.addItemLabel ?? "Add"}
    </button>
  {/if}

  {#if props.component.description}
    <div class={props.theme.classes.description}>
      {props.component.description}
    </div>
  {/if}

  {#if props.errors && props.errors.length > 0}
    <ValidationErrors
      classes={props.theme.classes}
      errors={props.errors.filter((e) => e.path.length === 0)}
    />
  {/if}
</div>
