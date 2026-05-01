<script lang="ts">
  import { setFormRendererContext, type FormRenderer } from "../formrenderer";

  type Props = FormRenderer & {
    children?: import("svelte").Snippet;
  };

  let {
    widgetComponents,
    multipleWidgetComponents,
    validatorComponents,
    children,
  }: Props = $props();

  $effect(() => {
    setFormRendererContext({
      widgetComponents,
      multipleWidgetComponents,
      validatorComponents,
    });
  });
</script>

<slot />
