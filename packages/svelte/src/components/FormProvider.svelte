<script lang="ts">
  import { Snippet } from "svelte";
  import {
    createFormRenderer,
    FormRenderer,
    setFormRendererContext,
  } from "../formrenderer";

  export type FormProviderProps = {
    renderer: FormRenderer;
    children: Snippet;
  };
  const { renderer, children }: FormProviderProps = $props();
  $effect(() => {
    setFormRendererContext(renderer);
  });
</script>

{@render children()}
