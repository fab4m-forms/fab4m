<script lang="ts">
  import { untrack } from "svelte";
  import type {
    DateRange,
    DateRangeWidgetSettings,
    WidgetProps,
  } from "@fab4m/fab4m";
  import FormComponentWrapper from "../components/FormComponentWrapper.svelte";

  type Props = WidgetProps<DateRange, DateRangeWidgetSettings>;

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
  }: Props = $props();

  let state = $state<Partial<DateRange>>(untrack(() => value ?? {}));

  $effect(() => {
    if (value) {
      state = value;
    }
  });

  const withTime = $derived(!!settings?.withTime);
  const type = $derived(withTime ? "datetime-local" : "date");
  const classes = $derived(theme.classes);
  const fromId = $derived(`${id}_from`);
  const toId = $derived(`${id}_to`);
  const fromName = $derived(`${name}[from]`);
  const toName = $derived(`${name}[to]`);

  function toInputValue(v: Date | undefined): string {
    if (!v) {
      return "";
    }
    return withTime
      ? v.toISOString().slice(0, 16)
      : v.toISOString().slice(0, 10);
  }

  function changeFromDate(e: Event) {
    const target = e.currentTarget as HTMLInputElement;
    const v = target.value;
    const from = v ? new Date(v) : undefined;
    state = { ...state, from };
    if (from) {
      onChange({ from, to: state.to });
    }
  }

  function changeToDate(e: Event) {
    const target = e.currentTarget as HTMLInputElement;
    const v = target.value;
    const to = v ? new Date(v) : undefined;
    state = { ...state, to };
    if (state.from) {
      onChange({ from: state.from, to });
    }
  }
</script>

<FormComponentWrapper
  {component}
  {theme}
  {hideLabel}
  {labels}
  {name}
  {id}
>
  <div class={classes.dateRangeWrapper ?? "date-range-wrapper"}>
    <input
      {type}
      class={classes.input}
      required={component.required}
      disabled={component.disabled}
      value={toInputValue(state.from)}
      oninput={changeFromDate}
      name={fromName}
      id={fromId}
      aria-label={settings?.fromLabel}
      placeholder={settings?.fromLabel}
      {...attributes}
    />
    <div class={classes.dateRangeSeparator ?? "date-range-separator"}>
      -
    </div>
    <input
      {type}
      class={classes.input}
      required={!settings?.optionalEndDate && !!state.from}
      disabled={component.disabled}
      value={toInputValue(state.to)}
      oninput={changeToDate}
      name={toName}
      id={toId}
      aria-label={settings?.toLabel}
      placeholder={settings?.toLabel}
      {...attributes}
    />
  </div>
</FormComponentWrapper>