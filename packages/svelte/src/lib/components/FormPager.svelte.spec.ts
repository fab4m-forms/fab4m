import { describe, it, expect, afterEach } from "vitest";
import { cleanup } from "vitest-browser-svelte";
import { page } from "vitest/browser";
import {
  textField,
  pageBreak,
  createForm,
  generatePartSchemas,
} from "@fab4m/fab4m";
import StatefulFormView from "../components/StatefulFormView.svelte";
import { renderWithProvider } from "../test-utils/renderWithProvider.js";

describe("Page break", () => {
  const form = createForm();
  form.add(textField({ name: "before", label: "Before page break" }));
  form.add(pageBreak({ name: "break", label: "Next page" }));
  form.add(textField({ name: "after", label: "After page break" }));
  let completed = false;
  form.onSubmit((e) => {
    e.preventDefault();
    completed = true;
  });

  afterEach(async () => {
    completed = false;
    await cleanup();
  });

  it("Interactive page break form", async () => {
    renderWithProvider(StatefulFormView, {
      form,
    });

    const beforeText = page.getByText("Before page break");
    await expect.element(beforeText).toBeVisible();
    await expect.element(page.getByText("Previous")).not.toBeInTheDocument();

    const next = page.getByText("Next");
    await expect.element(next).toBeInTheDocument();
    await next.click();

    await expect.element(page.getByText("Next")).not.toBeInTheDocument();
    await expect.element(beforeText).not.toBeVisible();
    await expect
      .element(page.getByLabelText("After page break"))
      .toBeVisible();

    const prev = page.getByText("Previous");
    await expect.element(prev).toBeVisible();
    await prev.click();

    await expect.element(page.getByText("Next")).toBeInTheDocument();
    await expect
      .element(page.getByLabelText("Before page break"))
      .toBeVisible();

    const next2 = page.getByText("Next");
    await next2.click();

    const complete = page.getByText("Complete");
    await complete.click();

    expect(completed).toBe(true);
  });

  it("Render form part", async () => {
    renderWithProvider(StatefulFormView, {
      form,
      part: 0,
    });

    await expect
      .element(page.getByText("Before page break"))
      .toBeInTheDocument();
    await expect
      .element(page.getByLabelText("After page break"))
      .not.toBeInTheDocument();
    await expect.element(page.getByText("Previous")).not.toBeInTheDocument();

    await cleanup();

    renderWithProvider(StatefulFormView, {
      form,
      part: 1,
    });

    await expect
      .element(page.getByText("Before page break"))
      .not.toBeInTheDocument();
    await expect
      .element(page.getByLabelText("After page break"))
      .toBeInTheDocument();
    await expect.element(page.getByText("Previous")).toBeInTheDocument();
  });

  it("Form part schemas", () => {
    const parts = generatePartSchemas(form);
    expect(parts).toHaveLength(2);
    expect(parts[0].properties).toHaveProperty("before");
    expect(parts[0].properties).not.toHaveProperty("after");
    expect(parts[1].properties).not.toHaveProperty("before");
    expect(parts[1].properties).toHaveProperty("after");
  });
});
