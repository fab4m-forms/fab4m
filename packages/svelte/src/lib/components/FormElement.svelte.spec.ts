import { describe, it, expect, afterEach } from "vitest";
import { cleanup } from "vitest-browser-svelte";
import { page } from "vitest/browser";
import { textField, basic } from "@fab4m/fab4m";
import type { FormComponent } from "@fab4m/fab4m";
import FormComponentView from "./FormComponentView.svelte";
import { renderWithProvider } from "../test-utils/renderWithProvider";

describe("Form label", () => {
  afterEach(async () => {
    await cleanup();
  });

  it("renders label text for a field", async () => {
    const field = textField({ label: "My label" });
    renderField(field);
    await expect.element(page.getByLabelText("My label")).toBeInTheDocument();
    await expect.element(page.getByText("*")).not.toBeInTheDocument();
  });

  it("renders required indicator (*) for required fields", async () => {
    const field = textField({ label: "My label", required: true });
    renderField(field);
    await expect.element(page.getByLabelText("My label")).toBeInTheDocument();
    await expect.element(page.getByText("*")).toBeInTheDocument();
  });

  it("hides label and required indicator when hideLabel is set", async () => {
    const field = textField({ label: "My label", required: true });
    renderField(field, true);
    await expect.element(page.getByRole("textbox")).toBeInTheDocument();
    await expect.element(page.getByText("*")).not.toBeInTheDocument();
  });
});

function renderField(field: FormComponent, hideLabel?: boolean) {
  renderWithProvider(FormComponentView, {
    name: "field",
    onChange: () => {},
    component: field,
    theme: basic,
    ...(hideLabel !== undefined ? { hideLabel } : {}),
  });
}