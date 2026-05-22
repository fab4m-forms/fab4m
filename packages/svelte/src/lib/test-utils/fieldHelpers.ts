import { describe, it, expect, afterEach } from "vitest";
import { cleanup } from "vitest-browser-svelte";
import { page } from "vitest/browser";
import type { FormComponent } from "@fab4m/fab4m";
import { basic } from "@fab4m/fab4m";
import FormComponentView from "../components/FormComponentView.svelte";
import { renderWithProvider } from "./renderWithProvider";

type FormElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

/**
 * Parameterized test helper that verifies standard element properties
 * for a given form component. Ported from React's `inputElementOk`.
 *
 * Tests: id/name matching, custom id/name, hidden label, and disabled state.
 */
export function inputElementOk(component: FormComponent, name = ""): void {
  describe(`${name} standard element properties`, () => {
    afterEach(async () => {
      await cleanup();
    });

    it("has correct id and name matching field name", async () => {
      if (!component.label) {
        return;
      }

      renderWithProvider(FormComponentView, {
        name: component.name ?? "",
        onChange: () => {},
        component,
        theme: basic,
      });

      const input = page.getByLabelText(component.label);
      await expect.element(input).toBeInTheDocument();
      await expect.element(input).toHaveAttribute("id", component.name ?? "");
      await expect.element(input).toHaveAttribute("name", component.name ?? "");
    });

    it("uses custom element id via id prop", async () => {
      if (!component.label) {
        return;
      }

      renderWithProvider(FormComponentView, {
        name: component.name ?? "",
        onChange: () => {},
        component,
        theme: basic,
        id: "custom-id",
      });

      const input = page.getByLabelText(component.label);
      await expect.element(input).toHaveAttribute("id", "custom-id");
    });

    it("uses custom element name via name prop", async () => {
      if (!component.label) {
        return;
      }

      renderWithProvider(FormComponentView, {
        name: "custom-name",
        onChange: () => {},
        component,
        theme: basic,
      });

      const input = page.getByLabelText(component.label);
      await expect.element(input).toHaveAttribute("name", "custom-name");
    });

    it("hides element label with hideLabel", async () => {
      if (!component.label) {
        return;
      }

      renderWithProvider(FormComponentView, {
        name: component.name ?? "",
        onChange: () => {},
        component,
        theme: basic,
        hideLabel: true,
      });

      await expect.element(page.getByLabelText(component.label)).not.toBeInTheDocument();
    });

    it("is disabled when component.disabled is true", async () => {
      if (!component.label) {
        return;
      }

      const disabled = { ...component, disabled: true };
      renderWithProvider(FormComponentView, {
        name: "choice",
        onChange: () => {},
        component: disabled,
        theme: basic,
      });

      const input = page.getByLabelText(component.label);
      await expect.element(input).toBeDisabled();
    });
  });
}