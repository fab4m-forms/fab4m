<script lang="ts">
  import { Theme } from "@fab4m/fab4m";

  type Props = {
    theme: Theme;
  };

  let { theme }: Props = $props();
  let classes = $derived(theme.classes);
</script>

<div class={classes.componentWrapper}>
  <div class={classes.elementWrapper}>
    <slot />
  </div>
</div>
