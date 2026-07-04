import { describe, it, expect, afterEach } from "vitest";
import { cleanup } from "vitest-browser-svelte";
import { page } from "vitest/browser";
import {
  integerField,
  floatField,
  numberFieldWidget,
  basic,
} from "@fab4m/fab4m";
import FormComponentView from "../components/FormComponentView.svelte";
import { renderWithProvider } from "../test-utils/renderWithProvider";
import { inputElementOk } from "../test-utils/fieldHelpers";

describe("number field", () => {
  const integer = integerField({
    name: "integer",
    label: "Integer field",
    required: true,
    widget: numberFieldWidget("This is a prefix"),
    validators: [],
  });

  const float = floatField({
    name: "float",
    label: "Float field",
    required: true,
    validators: [],
  });

  afterEach(async () => {
    await cleanup();
  });

  it("integer field", async () => {
    let data: number | null = null;

    renderWithProvider(FormComponentView, {
      name: "integer",
      onChange: (value: unknown) => {
        data = value as number;
      },
      component: integer,
      theme: basic,
      value: 0,
    });

    const element = page.getByLabelText("Integer field");
    await expect.element(element).toBeInTheDocument();

    await element.fill("50");
    await expect.element(element).toHaveValue(50);
    expect(data).toBe(50);

    await element.fill("50.5");
    expect(data).toBe(50);
  });

  it("float field", async () => {
    let data: number | null = null;

    renderWithProvider(FormComponentView, {
      name: "float",
      onChange: (value: unknown) => {
        data = value as number;
      },
      component: float,
      theme: basic,
      value: 10,
    });

    const element = page.getByLabelText("Float field");
    await expect.element(element).toBeInTheDocument();

    await element.fill("50.5");
    await expect.element(element).toHaveValue(50.5);
    expect(data).toBe(50.5);
  });

  inputElementOk(integer, "integer:");
  inputElementOk(float, "float:");
});
