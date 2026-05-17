<script lang="ts">
  import type { Snippet } from "svelte";
  import { setFormRendererContext } from "../formrenderer.js";
  import type { FormRenderer } from "../formrenderer.js";

  export type FormProviderProps = {
    renderer: FormRenderer;
    children: Snippet;
  };
  const { renderer, children }: FormProviderProps = $props();

  setFormRendererContext(() => renderer);
</script>

{@render children()}
