<script lang="ts">
	import type { FormComponent } from "@fab4m/fab4m";
  import {
    attributes,
  } from "@fab4m/fab4m";
  import type {
    Labels,
    Theme,
    ValidationError,
  } from "@fab4m/fab4m";
  import { getFormRendererContext } from "../formrenderer.js";
  import ValidationErrors from "./ValidationErrors.svelte";
  import ValidatorInfo from "./ValidatorInfo.svelte";
  import Multiple from "../widgets/multiple/Multiple.svelte";

  type FormComponentViewProps = {
    /** The current component value. */
    value?: unknown;
    /**
     * This event is triggered every time the component value is updated.
     * @param value the updated value.
     */
    onChange: (value: unknown) => void;
    /**
     * A list of errors that should be presented for the component.
     */
    errors?: ValidationError[];
    /**
     * The form theme that is being used.
     */
    theme: Theme;
    /**
     * Set this to true to optimize for server side rendering.
     */
    ssr?: boolean;
    /**
     * If this component is rendered as one of multiple items, Provide the current index in the list.
     */
    index?: number;
    /**
     * The name that should be applied to the form element.
     */
    name: string;
    /**
     * The id that should be applied to the form element.
     */
    id?: string;
    /**
     * A set of labels to be used.
     */
    labels?: Labels;
    /**
     * Attributes that should be passed along to the form element in this widget.
     */
    attributes?: Record<string, string | number | boolean>;
    /**
     * Hide the label for this component.
     */
    hideLabel?: boolean;
    /**
     * Hide the description for this component.
     */
    hideDescription?: boolean;
    /**The Component that should be rendered.*/
    component: FormComponent;
  };

  const props: FormComponentViewProps = $props();

  const widgetAttributes = $derived({
    ...(props.attributes ?? {}),
    ...attributes(props.component),
  });

  const getRenderer = getFormRendererContext();

  const id = $derived(props.id ?? props.name);

  const isMultiple = $derived(
    props.component.multiple && typeof props.index === "undefined",
  );

  const MultipleWidget = $derived.by(() => {
    if (!isMultiple) return null;
    if (props.component.multipleWidget) {
      const { multipleWidgetComponents } = getRenderer();
      if (
        !multipleWidgetComponents ||
        !multipleWidgetComponents[props.component.multipleWidget.type.name]
      ) {
        throw new Error(
          `No component for widget ${props.component.widget.type.name}`,
        );
      }
      return multipleWidgetComponents[props.component.multipleWidget.type.name];
    }
    return Multiple;
  });

  const Widget = $derived.by(() => {
    if (isMultiple) return null;
    const { widgetComponents } = getRenderer();
    if (!widgetComponents[props.component.widget.type.name]) {
      throw new Error(
        `No component for widget ${props.component.widget.type.name}`,
      );
    }
    return widgetComponents[props.component.widget.type.name];

  });
</script>

{#if isMultiple && MultipleWidget}
  <MultipleWidget
    component={props.component}
    value={props.value as unknown[]}
    settings={props.component.multipleWidget?.settings}
    onChange={props.onChange}
    errors={props.errors}
    ssr={!!props.ssr}
    {id}
    labels={props.labels}
    name={props.name}
    attributes={widgetAttributes}
    theme={props.theme}
  />
{:else if Widget && Widget != "EMPTY_COMPONENT"}
  <div class={props.theme.classes.componentWrapper}>
    <Widget
      component={props.component}
      value={props.value}
      settings={props.component.widget.settings}
      onChange={props.onChange}
      errors={props.errors}
      ssr={!!props.ssr}
      labels={props.labels}
      hideLabel={props.hideLabel}
      {id}
      name={props.name ?? props.component.name}
      index={props.index}
      attributes={widgetAttributes}
      theme={props.theme}
    />
    {#if props.component.description && !props.hideDescription}
      <div class={props.theme.classes.description}>
        {props.component.description}
      </div>
    {/if}
    {#if props.errors && props.errors.length > 0}
      <ValidationErrors
        errors={props.errors.filter((e) => e.path.length === 0)}
        classes={props.theme.classes}
      />
    {/if}
    <ValidatorInfo
      theme={props.theme}
      component={props.component}
      value={props.value}
    />
  </div>
{/if}
