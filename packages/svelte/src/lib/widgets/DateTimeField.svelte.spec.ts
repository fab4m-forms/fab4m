import { describe, it, expect, afterEach } from "vitest";
import { cleanup } from "vitest-browser-svelte";
import { page } from "vitest/browser";
import { basic, dateTimeField, dateTimePickerWidget } from "@fab4m/fab4m";
import FormComponentView from "../components/FormComponentView.svelte";
import { renderWithProvider } from "../test-utils/renderWithProvider.js";
import { inputElementOk } from "../test-utils/fieldHelpers.js";

describe("date time field", () => {
  const datetime = dateTimeField({
    name: "datetimefield",
    label: "Date time field",
    required: true,
    widget: dateTimePickerWidget(),
    validators: [],
  });

  afterEach(() => {
    cleanup();
  });

  it("renders a native datetime-local input with the right value", async () => {
    const value = new Date("2020-01-01T05:20:00.000Z");

    renderWithProvider(FormComponentView, {
      name: "datetimefield",
      onChange: () => {},
      component: datetime,
      theme: basic,
      value,
    });

    const element = page.getByLabelText("Date time field");
    await expect.element(element).toHaveAttribute("type", "datetime-local");
    await expect.element(element).toHaveValue("2020-01-01T05:20");
  });

  it("data changes flow back through onChange", async () => {
    let data: Date | undefined = new Date("2020-01-01T05:20:00.000Z");

    renderWithProvider(FormComponentView, {
      name: "datetimefield",
      onChange: (value: unknown) => {
        data = value as Date;
      },
      component: datetime,
      theme: basic,
      value: data,
    });

    const element = page.getByLabelText("Date time field");
    await element.fill("2021-05-15T08:30");
    expect(data?.getFullYear()).toBe(2021);
    expect(data?.getMonth()).toBe(4);
    expect(data?.getDate()).toBe(15);
    expect(data?.getHours()).toBe(8);
    expect(data?.getMinutes()).toBe(30);
  });

  inputElementOk(datetime, "datetime:");
});
