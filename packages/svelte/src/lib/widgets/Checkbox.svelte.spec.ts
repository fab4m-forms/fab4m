import { describe, it, expect, afterEach } from "vitest";
import { cleanup } from "vitest-browser-svelte";
import { page } from "vitest/browser";
import { basic, booleanField, checkboxWidget } from "@fab4m/fab4m";
import FormComponentView from "../components/FormComponentView.svelte";
import { renderWithProvider } from "../test-utils/renderWithProvider";
import { inputElementOk } from "../test-utils/fieldHelpers";

describe("Boolean field", () => {
  const field = booleanField({
    name: "choice",
    label: "A choice",
    required: true,
    widget: checkboxWidget(),
    validators: [],
  });

  afterEach(async () => {
    await cleanup();
  });

  it("Boolean choice", async () => {
    let data = false;

    renderWithProvider(FormComponentView, {
      name: "choice",
      theme: basic,
      onChange: (value: unknown) => {
        data = value as boolean;
      },
      component: field,
      value: data,
    });

    const element = page.getByLabelText("A choice");
    await expect.element(element).not.toBeChecked();
    await expect.element(page.getByText(field.label ?? "")).toBeInTheDocument();

    await element.click();
    await expect.element(element).toBeChecked();
    expect(data).toBe(true);
  });

  inputElementOk(field, "boolean:");
});
