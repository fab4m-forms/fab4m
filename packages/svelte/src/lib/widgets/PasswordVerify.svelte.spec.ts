import { describe, it, expect, afterEach } from "vitest";
import { cleanup } from "vitest-browser-svelte";
import { page } from "vitest/browser";
import {
  basic,
  passwordVerifyField,
  passwordVerifyWidget,
} from "@fab4m/fab4m";
import type { PasswordVerifyData } from "@fab4m/fab4m";
import FormComponentView from "../components/FormComponentView.svelte";
import { renderWithProvider } from "../test-utils/renderWithProvider.js";

describe("password verify field", () => {
  const password = passwordVerifyField({
    name: "password",
    label: "Password field",
    required: true,
    widget: passwordVerifyWidget(),
    validators: [],
  });

  afterEach(() => {
    cleanup();
  });

  it("renders two password inputs with the right names", async () => {
    renderWithProvider(FormComponentView, {
      name: "password",
      onChange: () => {},
      component: password,
      theme: basic,
    });

    const first = page.getByRole("textbox").nth(0);
    const confirm = page.getByRole("textbox").nth(1);
    await expect.element(first).toHaveAttribute("type", "password");
    await expect.element(confirm).toHaveAttribute("type", "password");
    await expect.element(first).toHaveAttribute("name", "password[password]");
    await expect
      .element(confirm)
      .toHaveAttribute("name", "password[confirmPassword]");
  });

  it("confirm input gets a pattern matching the password", async () => {
    const value: PasswordVerifyData = {
      password: "mypassword",
      confirmPassword: "",
    };

    renderWithProvider(FormComponentView, {
      name: "password",
      onChange: () => {},
      component: password,
      theme: basic,
      value,
    });

    const confirm = page.getByRole("textbox").nth(1);
    await expect.element(confirm).toHaveAttribute("pattern", "^mypassword$");
  });

  it("shows a match hint when password equals confirmPassword", async () => {
    const value: PasswordVerifyData = {
      password: "mypassword",
      confirmPassword: "mypassword",
    };

    renderWithProvider(FormComponentView, {
      name: "password",
      onChange: () => {},
      component: password,
      theme: basic,
      value,
    });

    await expect
      .element(page.getByText("The password matches!"))
      .toBeInTheDocument();
  });

  it("data changes flow back through onChange", async () => {
    let data: PasswordVerifyData = {
      password: "",
      confirmPassword: "",
    };

    renderWithProvider(FormComponentView, {
      name: "password",
      onChange: (value: unknown) => {
        data = value as PasswordVerifyData;
      },
      component: password,
      theme: basic,
      value: data,
    });

    const first = page.getByRole("textbox").nth(0);
    await first.fill("newpass");
    expect(data.password).toBe("newpass");

    const confirm = page.getByRole("textbox").nth(1);
    await confirm.fill("newpass");
    expect(data.confirmPassword).toBe("newpass");
  });
});