import { describe, it, expect, afterEach, vi } from "vitest";
import { cleanup } from "vitest-browser-svelte";
import { page } from "vitest/browser";
import { createForm, textField, textFieldWidget } from "@fab4m/fab4m";
import StatefulFormView from "./StatefulFormView.svelte";
import { renderWithProvider } from "../test-utils/renderWithProvider";

describe("Stateful Form", () => {
  const form = createForm({
    requiredText: textField({
      label: "Required text",
      required: true,
      widget: textFieldWidget(),
      validators: [],
    }),
    otherText: textField({
      label: "Other text field",
      widget: textFieldWidget(),
      required: false,
      validators: [],
    }),
  });

  afterEach(async () => {
    await cleanup();
  });

  it("Stateful form view with on data change", async () => {
    const spy = vi.fn();
    form.onDataChange(spy);

    renderWithProvider(StatefulFormView, {
      form,
    });

    const element = page.getByLabelText("Required text");
    await element.fill("Text");

    expect(spy).toHaveBeenCalled();
  });
});