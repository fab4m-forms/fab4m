<script lang="ts">
  import type { Snippet } from "svelte";
  import type { Theme } from "@fab4m/fab4m";

  type Props = {
    theme: Theme;
    children: Snippet;
  };

  let { theme, children }: Props = $props();
  let classes = $derived(theme.classes);
</script>

<div class={classes.componentWrapper}>
  <div class={classes.elementWrapper}>
    {@render children()}
  </div>
</div>
