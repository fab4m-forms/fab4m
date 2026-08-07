import { describe, it, expect, afterEach } from "vitest";
import { cleanup } from "vitest-browser-svelte";
import { page } from "vitest/browser";
import {
  basic,
  passwordValidateOldField,
  passwordValidateOldWidget,
} from "@fab4m/fab4m";
import type { PasswordValidateOldData } from "@fab4m/fab4m";
import FormComponentView from "../components/FormComponentView.svelte";
import { renderWithProvider } from "../test-utils/renderWithProvider.js";

describe("password validate old field", () => {
  const password = passwordValidateOldField({
    name: "password",
    label: "Password field",
    required: true,
    widget: passwordValidateOldWidget(),
    validators: [],
  });

  afterEach(() => {
    cleanup();
  });

  it("renders three password inputs with the right names", async () => {
    renderWithProvider(FormComponentView, {
      name: "password",
      onChange: () => {},
      component: password,
      theme: basic,
    });

    const inputs = page.getByRole("textbox");
    await expect
      .element(inputs.nth(0))
      .toHaveAttribute("name", "password[oldpassword]");
    await expect
      .element(inputs.nth(1))
      .toHaveAttribute("name", "password[password]");
    await expect
      .element(inputs.nth(2))
      .toHaveAttribute("name", "password[confirmPassword]");
  });

  it("data changes flow back through onChange", async () => {
    let data: PasswordValidateOldData = {
      oldPassword: "",
      password: "",
      confirmPassword: "",
    };

    renderWithProvider(FormComponentView, {
      name: "password",
      onChange: (value: unknown) => {
        data = value as PasswordValidateOldData;
      },
      component: password,
      theme: basic,
      value: data,
    });

    await page.getByRole("textbox").nth(0).fill("oldpw");
    expect(data.oldPassword).toBe("oldpw");

    await page.getByRole("textbox").nth(1).fill("newpw");
    expect(data.password).toBe("newpw");

    await page.getByRole("textbox").nth(2).fill("newpw");
    expect(data.confirmPassword).toBe("newpw");
  });

  it("confirm input gets a pattern matching the new password", async () => {
    const value: PasswordValidateOldData = {
      oldPassword: "",
      password: "newpw",
      confirmPassword: "",
    };

    renderWithProvider(FormComponentView, {
      name: "password",
      onChange: () => {},
      component: password,
      theme: basic,
      value,
    });

    const confirm = page.getByRole("textbox").nth(2);
    await expect.element(confirm).toHaveAttribute("pattern", "^newpw$");
  });
});