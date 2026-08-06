import { describe, it, expect, afterEach } from "vitest";
import { cleanup } from "vitest-browser-svelte";
import { page } from "vitest/browser";
import { basic, dateRangeField, dateRangePickerWidget } from "@fab4m/fab4m";
import type { DateRange } from "@fab4m/fab4m";
import FormComponentView from "../components/FormComponentView.svelte";
import { renderWithProvider } from "../test-utils/renderWithProvider.js";

describe("date range field", () => {
  const range = dateRangeField({
    name: "rangefield",
    label: "Date range field",
    required: true,
    validators: [],
  });

  afterEach(() => {
    cleanup();
  });

  it("renders two native date inputs with the right names", async () => {
    renderWithProvider(FormComponentView, {
      name: "rangefield",
      onChange: () => {},
      component: range,
      theme: basic,
    });

    const from = page.getByLabelText("From");
    const to = page.getByLabelText("To");
    await expect.element(from).toHaveAttribute("type", "date");
    await expect.element(to).toHaveAttribute("type", "date");
    await expect.element(from).toHaveAttribute("name", "rangefield[from]");
    await expect.element(to).toHaveAttribute("name", "rangefield[to]");
  });

  it("displays the value as YYYY-MM-DD for from and to", async () => {
    const value: DateRange = {
      from: new Date("2020-01-01T00:00:00.000Z"),
      to: new Date("2020-01-06T00:00:00.000Z"),
    };

    renderWithProvider(FormComponentView, {
      name: "rangefield",
      onChange: () => {},
      component: range,
      theme: basic,
      value,
    });

    await expect.element(page.getByLabelText("From")).toHaveValue("2020-01-01");
    await expect.element(page.getByLabelText("To")).toHaveValue("2020-01-06");
  });

  it("data changes flow back through onChange", async () => {
    let data: DateRange = {
      from: new Date("2020-01-01T00:00:00.000Z"),
      to: new Date("2020-01-06T00:00:00.000Z"),
    };

    renderWithProvider(FormComponentView, {
      name: "rangefield",
      onChange: (value: unknown) => {
        data = value as DateRange;
      },
      component: range,
      theme: basic,
      value: data,
    });

    await page.getByLabelText("From").fill("2020-02-02");
    await page.getByLabelText("To").fill("2021-03-03");
    expect(data.from.toISOString().slice(0, 10)).toBe("2020-02-02");
    expect(data.to?.toISOString().slice(0, 10)).toBe("2021-03-03");
  });

  it("withTime toggles the input type to datetime-local", async () => {
    const withTime = dateRangeField({
      name: "rangefield",
      label: "Date range field",
      required: true,
      widget: dateRangePickerWidget({
        fromLabel: "From",
        toLabel: "To",
        withTime: true,
      }),
      validators: [],
    });
    const value: DateRange = {
      from: new Date("2020-01-01T05:20:00.000Z"),
      to: new Date("2020-01-06T08:30:00.000Z"),
    };

    renderWithProvider(FormComponentView, {
      name: "rangefield",
      onChange: () => {},
      component: withTime,
      theme: basic,
      value,
    });

    await expect
      .element(page.getByLabelText("From"))
      .toHaveAttribute("type", "datetime-local");
    await expect
      .element(page.getByLabelText("To"))
      .toHaveAttribute("type", "datetime-local");
    await expect
      .element(page.getByLabelText("From"))
      .toHaveValue("2020-01-01T05:20");
    await expect
      .element(page.getByLabelText("To"))
      .toHaveValue("2020-01-06T08:30");
  });

  it("optionalEndDate makes the 'to' input not required", async () => {
    const optional = dateRangeField({
      name: "rangefield",
      label: "Date range field",
      required: true,
      widget: dateRangePickerWidget({
        fromLabel: "From",
        toLabel: "To",
        optionalEndDate: true,
      }),
      validators: [],
    });
    const value: DateRange = {
      from: new Date("2020-01-01T00:00:00.000Z"),
      to: new Date("2020-01-06T00:00:00.000Z"),
    };

    renderWithProvider(FormComponentView, {
      name: "rangefield",
      onChange: () => {},
      component: optional,
      theme: basic,
      value,
    });

    await expect.element(page.getByLabelText("To")).not.toHaveAttribute("required");
  });

  it("'to' input is required by default when a from value is present", async () => {
    const value: DateRange = {
      from: new Date("2020-01-01T00:00:00.000Z"),
      to: new Date("2020-01-06T00:00:00.000Z"),
    };

    renderWithProvider(FormComponentView, {
      name: "rangefield",
      onChange: () => {},
      component: range,
      theme: basic,
      value,
    });

    await expect.element(page.getByLabelText("To")).toHaveAttribute("required");
  });
});
