import { describe, it, expect, afterEach } from "vitest";
import { cleanup } from "vitest-browser-svelte";
import { page } from "vitest/browser";
import { basic, dateField, datePickerWidget } from "@fab4m/fab4m";
import FormComponentView from "../components/FormComponentView.svelte";
import { renderWithProvider } from "../test-utils/renderWithProvider";
import { inputElementOk } from "../test-utils/fieldHelpers";

describe("date field", () => {
  const date = dateField({
    name: "datefield",
    label: "Date field",
    required: true,
    widget: datePickerWidget(),
    validators: [],
  });

  afterEach(async () => {
    await cleanup();
  });

  it("renders a native date input with the right value", async () => {
    const value = new Date("2020-01-01T00:00:00.000Z");

    renderWithProvider(FormComponentView, {
      name: "datefield",
      onChange: () => {},
      component: date,
      theme: basic,
      value,
    });

    const element = page.getByLabelText("Date field");
    await expect.element(element).toHaveAttribute("type", "date");
    await expect.element(element).toHaveValue("2020-01-01");
  });

  it("data changes flow back through onChange", async () => {
    let data: Date | undefined = new Date("2020-01-01T00:00:00.000Z");

    renderWithProvider(FormComponentView, {
      name: "datefield",
      onChange: (value: unknown) => {
        data = value as Date;
      },
      component: date,
      theme: basic,
      value: data,
    });

    const element = page.getByLabelText("Date field");
    await element.fill("2021-05-15");
    expect(data?.toISOString().slice(0, 10)).toBe("2021-05-15");
  });

  inputElementOk(date, "date:");
});