import { describe, it, expect, afterEach } from "vitest";
import { cleanup } from "vitest-browser-svelte";
import { page } from "vitest/browser";
import { basic, submit } from "@fab4m/fab4m";
import FormComponentView from "../components/FormComponentView.svelte";
import { renderWithProvider } from "../test-utils/renderWithProvider";

describe("Submit button", () => {
  const field = submit(
    {
      name: "content",
    },
    { title: "Submit button" },
  );

  afterEach(async () => {
    await cleanup();
  });

  it("renders a submit button with the configured title", async () => {
    renderWithProvider(FormComponentView, {
      name: "content",
      theme: basic,
      onChange: () => {},
      component: field,
      value: {},
    });

    await expect.element(page.getByText("Submit button")).toBeInTheDocument();
  });
});