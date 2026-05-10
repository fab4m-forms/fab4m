<script lang="ts">
  import { type Component } from "svelte";
  import {
    findOption,
    isOptionGroup,
    optionValue,
  } from "@fab4m/fab4m";
  import type {
    MultipleWidgetProps,
    SelectWidgetSettings,
    TagsSettings,
  } from "@fab4m/fab4m";
  import FormComponentView from "../../components/FormComponentView.svelte";
  import ValidationErrors from "../../components/ValidationErrors.svelte";

  type Props<Value> = MultipleWidgetProps<Value, TagsSettings | undefined>;

  let { component, theme, settings, value, onChange, name, id, errors }: Props<string> = $props();

  let items = $derived(value ?? []);

  let defaultSettings: Required<TagsSettings> = $derived({
    addItemLabel: settings?.addItemLabel ?? "Add",
    removeItemLabel: settings?.removeItemLabel ?? "Remove",
    addOnChange: settings?.addOnChange ?? false,
    itemAlreadyAddedMessage: settings?.itemAlreadyAddedMessage ?? "This item has already been added",
  });

  let draft = $state<string | undefined>(undefined);

  let addItem = (val: string) => onChange([...items, val]);

  let changeOrAdd = (data: unknown) => {
    draft = data as string | undefined;
    if (typeof data !== "undefined" && defaultSettings.addOnChange) {
      draft = undefined;
      addItem(data as string);
    }
  };

  let addButtonClicked = () => {
    const val = draft;
    if (typeof val !== "undefined") {
      draft = undefined;
      addItem(val);
    }
  };

  let itemExists = $derived(draft && items.findIndex((v) => v === draft) !== -1);

  let displayErrors = $derived.by(() => {
    const errs = errors ?? [];
    if (itemExists) {
      return [...errs, { path: "", message: defaultSettings.itemAlreadyAddedMessage }];
    }
    return errs;
  });

  let removeValue = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    onChange(newItems);
  };

  const getDisplayValue = (comp: { widget: { type: { name: string }; settings: any } }, val: string): string | number | undefined => {
    if (comp.widget.type.name !== "select") {
      return typeof val === "number" || typeof val === "string" ? val : undefined;
    }
    const selectSettings = comp.widget.settings as SelectWidgetSettings<string>;
    const option = findOption(selectSettings.options, val);
    if (!option) {
      return typeof val === "number" || typeof val === "string" ? val : undefined;
    }
    return Array.isArray(option) ? option[0] : (typeof option === "number" || typeof option === "string" ? option : undefined);
  };

  const alterComponent = (comp: any, values: string[] | undefined): any => {
    const alteredComponent = {
      ...comp,
      widget: {
        ...comp.widget,
        settings: { ...comp.widget.settings },
      },
      description: undefined,
      required: false,
    };
    if (comp.widget.type.name === "select" && values) {
      const newOptions = [];
      for (const option of comp.widget.settings.options) {
        if (!isOptionGroup(option) && values.findIndex((v) => v === optionValue(option)) === -1) {
          newOptions.push(option);
        }
      }
      alteredComponent.widget.settings.options = newOptions;
    }
    return alteredComponent;
  };
</script>

<div class={theme.classes.tags}>
  {#if component.label}
    <label class={theme.classes.label} for={id}>
      {component.label}
    </label>
  {/if}
  {#if items.length > 0}
    <div class={theme.classes.addedTags}>
      {#each items as itemValue, index}
        <div class={theme.classes.tag}>
          <div class={theme.classes.tagLabel}>{getDisplayValue(component, itemValue)}</div>
          {#if !component.disabled}
            <button
              class={theme.classes.removeTag}
              type="button"
              onclick={() => removeValue(index)}
            >
              {defaultSettings.removeItemLabel}
            </button>
          {/if}
        </div>
      {/each}
    </div>
  {/if}
  {#if !component.disabled && (!component.maxItems || component.maxItems > items.length)}
    <div class={theme.classes.addTagWrapper}>
      <FormComponentView
        value={draft}
        onChange={changeOrAdd}
        index={0}
        hideLabel={true}
        {name}
        {theme}
        component={alterComponent(component, items)}
      />
      {#if !defaultSettings.addOnChange}
        <button
          type="button"
          disabled={typeof draft === "undefined" || !!itemExists}
          onclick={addButtonClicked}
          id={`${id}-add`}
          class={theme.classes.addTag}
        >
          {defaultSettings.addItemLabel}
        </button>
      {/if}
    </div>
  {/if}
  {#if component.description}
    <div class={theme.classes.description}>
      {component.description}
    </div>
  {/if}
  {#if errors}
    <ValidationErrors errors={displayErrors} classes={theme.classes} />
  {/if}
</div>
