<script lang="ts">
  import { DetailsSettings, WidgetProps } from "@fab4m/fab4m";
  import { GroupChildren } from "./GroupChildren";
  /**
   * Render a details widget with the group of fields.
   * The summary part can either be a string or any phrasing html content
   * in the form of react components.
   * @group React widgets
   */
  let props: WidgetProps<any, DetailsSettings<any>> = $props();
  let summary = $derived.by(() => {
    if (props.settings.summary) {
      return typeof props.settings.summary === "function"
        ? props.settings.summary(props.value)
        : props.settings.summary;
    }
    return props.component.label;
  });
</script>
{#if props.component.components}
<details
  open={props.settings.open}
  id={props.id}
  class={props.theme.classes.details}
>
  <summary class={props.theme.classes.summary}>{summary}</summary>
  <div class={props.theme.classes.detailsContent}>
    <GroupChildren {...props} />
  </div>
</details>
{/if}
