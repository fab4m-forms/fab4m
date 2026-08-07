import { describe, it, expect, afterEach } from "vitest";
import { cleanup } from "vitest-browser-svelte";
import { page } from "vitest/browser";
import { basic, passwordField } from "@fab4m/fab4m";
import FormComponentView from "../components/FormComponentView.svelte";
import { renderWithProvider } from "../test-utils/renderWithProvider.js";
import { inputElementOk } from "../test-utils/fieldHelpers.js";

describe("password field", () => {
  const password = passwordField({
    name: "passwordfield",
    label: "Password field",
    required: true,
    validators: [],
  });

  afterEach(async () => {
    await cleanup();
  });

  it("renders a password input with the right value", async () => {
    renderWithProvider(FormComponentView, {
      name: "passwordfield",
      onChange: () => {},
      component: password,
      theme: basic,
      value: "secret",
    });

    const element = page.getByLabelText("Password field");
    await expect.element(element).toHaveAttribute("type", "password");
    await expect.element(element).toHaveValue("secret");
  });

  it("data changes flow back through onChange", async () => {
    let data = "secret";

    renderWithProvider(FormComponentView, {
      name: "passwordfield",
      onChange: (value: unknown) => {
        data = value as string;
      },
      component: password,
      theme: basic,
      value: data,
    });

    const element = page.getByLabelText("Password field");
    await element.fill("newsecret");
    expect(data).toBe("newsecret");
  });

  inputElementOk(password, "password:");
});