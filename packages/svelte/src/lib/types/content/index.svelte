<script lang="ts">
  import type { WidgetProps } from "@fab4m/fab4m";
  import { getFormDataContext } from "../../context.js";
  import type { Snippet } from "svelte";

  type Props<Type> = WidgetProps<undefined, Snippet<[Type]>>;

  let { settings }: Props<Record<string, unknown>> = $props();

  let data = getFormDataContext();
</script>

{@render settings(data)}
