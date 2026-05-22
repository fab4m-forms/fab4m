import { render } from "vitest-browser-svelte";
import type { Component } from "svelte";
import TestProvider from "./TestProvider.svelte";
import type { FormRenderer } from "../formrenderer.js";
import { allWidgetsRenderer } from "../allwidgets.js";

/**
 * Renders a Svelte component wrapped in a FormProvider for testing.
 * Uses vitest-browser-svelte's render under the hood.
 */
export function renderWithProvider(
  component: Component<any>,
  props?: Record<string, unknown>,
  renderer: FormRenderer = allWidgetsRenderer,
) {
  return render(TestProvider, {
    component,
    componentProps: props ?? {},
  } as Record<string, unknown>);
}
