import * as React from "react";
import { fireEvent, waitFor, cleanup } from "@testing-library/react";
import {
  basic,
  DateRange,
  dateRangeField,
  dateRangePickerWidget,
} from "@fab4m/fab4m";
import { FormComponentView } from "../../src/index";
import { renderWithProvider } from "../util";

describe("date range field widget", () => {
  afterEach(cleanup);

  const component = dateRangeField({
    name: "range",
    label: "Date range field",
    required: true,
    validators: [],
  });

  test("renders two native date inputs with the right names", async () => {
    const { findByPlaceholderText } = renderWithProvider(
      <FormComponentView
        name="range"
        onChange={() => {}}
        component={component}
        theme={basic}
      />,
    );
    const fromElement = (await findByPlaceholderText(
      "From",
    )) as HTMLInputElement;
    const toElement = (await findByPlaceholderText("To")) as HTMLInputElement;
    expect(fromElement.type).toBe("date");
    expect(toElement.type).toBe("date");
    expect(fromElement.name).toBe("range[from]");
    expect(toElement.name).toBe("range[to]");
  });

  test("displays the value as YYYY-MM-DD for from and to", () => {
    const value: DateRange = {
      from: new Date("2020-01-01T00:00:00.000Z"),
      to: new Date("2020-01-06T00:00:00.000Z"),
    };
    const { queryByPlaceholderText } = renderWithProvider(
      <FormComponentView
        name="range"
        onChange={() => {}}
        component={component}
        theme={basic}
        value={value}
      />,
    );
    const fromElement = queryByPlaceholderText("From") as HTMLInputElement;
    const toElement = queryByPlaceholderText("To") as HTMLInputElement;
    expect(fromElement.value).toBe("2020-01-01");
    expect(toElement.value).toBe("2020-01-06");
  });

  test("value round-trip: input changes emit a DateRange", async () => {
    let data: DateRange = {
      from: new Date("2020-01-01T00:00:00.000Z"),
      to: new Date("2020-01-06T00:00:00.000Z"),
    };
    const changeData = (value: unknown) => {
      data = value as DateRange;
    };
    const { findByPlaceholderText } = renderWithProvider(
      <FormComponentView
        name="range"
        onChange={changeData}
        component={component}
        theme={basic}
        value={data}
      />,
    );
    const fromElement = (await findByPlaceholderText(
      "From",
    )) as HTMLInputElement;
    const toElement = (await findByPlaceholderText("To")) as HTMLInputElement;
    fireEvent.input(fromElement, { target: { value: "2020-02-02" } });
    fireEvent.input(toElement, { target: { value: "2021-03-03" } });
    await waitFor(() => {
      expect(data.from.toISOString().slice(0, 10)).toBe("2020-02-02");
      expect(data.to?.toISOString().slice(0, 10)).toBe("2021-03-03");
    });
  });

  test("withTime toggles the input type to datetime-local", async () => {
    const withTimeComponent = dateRangeField({
      name: "range",
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
    const { findByPlaceholderText } = renderWithProvider(
      <FormComponentView
        name="range"
        onChange={() => {}}
        component={withTimeComponent}
        theme={basic}
        value={value}
      />,
    );
    const fromElement = (await findByPlaceholderText(
      "From",
    )) as HTMLInputElement;
    const toElement = (await findByPlaceholderText("To")) as HTMLInputElement;
    expect(fromElement.type).toBe("datetime-local");
    expect(toElement.type).toBe("datetime-local");
    expect(fromElement.value).toBe("2020-01-01T05:20");
    expect(toElement.value).toBe("2020-01-06T08:30");
  });

  test("optionalEndDate makes the 'to' input not required", async () => {
    const optionalComponent = dateRangeField({
      name: "range",
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
    const { findByPlaceholderText } = renderWithProvider(
      <FormComponentView
        name="range"
        onChange={() => {}}
        component={optionalComponent}
        theme={basic}
        value={value}
      />,
    );
    const toElement = (await findByPlaceholderText("To")) as HTMLInputElement;
    expect(toElement.required).toBe(false);
  });

  test("'to' input is required by default when a from value is present", async () => {
    const value: DateRange = {
      from: new Date("2020-01-01T00:00:00.000Z"),
      to: new Date("2020-01-06T00:00:00.000Z"),
    };
    const { findByPlaceholderText } = renderWithProvider(
      <FormComponentView
        name="range"
        onChange={() => {}}
        component={component}
        theme={basic}
        value={value}
      />,
    );
    const toElement = (await findByPlaceholderText("To")) as HTMLInputElement;
    expect(toElement.required).toBe(true);
  });
});
