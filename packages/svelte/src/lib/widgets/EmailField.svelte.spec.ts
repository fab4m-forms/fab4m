import { describe, it, expect, afterEach } from "vitest";
import { cleanup } from "vitest-browser-svelte";
import { page } from "vitest/browser";
import { basic, emailField, emailWidget } from "@fab4m/fab4m";
import FormComponentView from "../components/FormComponentView.svelte";
import { renderWithProvider } from "../test-utils/renderWithProvider";
import { inputElementOk } from "../test-utils/fieldHelpers";

describe("Email field", () => {
  const email = emailField({
    name: "required_text",
    label: "Required text",
    required: true,
    widget: emailWidget(),
    validators: [],
  });

  afterEach(async () => {
    await cleanup();
  });

  it("email field widget and data", async () => {
    let data = "email@email.com";

    renderWithProvider(FormComponentView, {
      name: "required_text",
      theme: basic,
      onChange: (value: unknown) => {
        data = value as string;
      },
      component: email,
      value: data,
    });

    const element = page.getByLabelText("Required text");
    await expect.element(element).toHaveValue("email@email.com");

    await element.fill("otheremail@email.com");
    expect(data).toBe("otheremail@email.com");
    await expect.element(element).toHaveValue("otheremail@email.com");
  });

  inputElementOk(email, "email:");
});
