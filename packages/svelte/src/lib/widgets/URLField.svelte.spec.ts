import { describe, it, expect, afterEach } from "vitest";
import { cleanup } from "vitest-browser-svelte";
import { page } from "vitest/browser";
import { basic, urlField } from "@fab4m/fab4m";
import FormComponentView from "../components/FormComponentView.svelte";
import { renderWithProvider } from "../test-utils/renderWithProvider";
import { inputElementOk } from "../test-utils/fieldHelpers";

describe("url field", () => {
  const url = urlField({
    name: "url",
    label: "URL",
    required: true,
    validators: [],
  });

  afterEach(async () => {
    await cleanup();
  });

  it("url field widget and data", async () => {
    let data = "https://example.com/";

    renderWithProvider(FormComponentView, {
      name: "url",
      theme: basic,
      onChange: (value: unknown) => {
        data = value as string;
      },
      component: url,
      value: data,
    });

    const element = page.getByLabelText("URL");
    await expect.element(element).toHaveValue("https://example.com/");
    await expect.element(element).toHaveAttribute("type", "url");

    await element.fill("https://otherexample.com/");
    expect(data).toBe("https://otherexample.com/");
    await expect.element(element).toHaveValue("https://otherexample.com/");
  });

  inputElementOk(url, "url:");
});
