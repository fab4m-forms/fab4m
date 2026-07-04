<script lang="ts">
  import { onMount } from "svelte";
  import { createTailwindTheme, setDefaultTheme } from "@fab4m/fab4m";

  const theme = createTailwindTheme({
    settings: {
      primaryBg: "bg-cyan-600",
      secondaryBg: "bg-cyan-600",
    },
  });
  setDefaultTheme(theme);

  let { children } = $props();
</script>

{@render children?.()}
