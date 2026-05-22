<script lang="ts">
  import type { Component as SvelteComponent } from "svelte";
  import FormProvider from "../components/FormProvider.svelte";
  import { allWidgetsRenderer } from "../allwidgets.js";

  let {
    component: Component,
    componentProps = {},
  }: {
    component: SvelteComponent<any>;
    componentProps?: Record<string, unknown>;
  } = $props();
</script>

<FormProvider renderer={allWidgetsRenderer}>
  {#snippet children()}
    <Component {...componentProps} />
  {/snippet}
</FormProvider>