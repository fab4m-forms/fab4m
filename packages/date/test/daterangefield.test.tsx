import * as React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { basic, FormComponentView } from "@fab4m/fab4m";
import { DateRange, dateRangeField } from "../src";
import { format, addDays } from "date-fns";

describe("date range field", () => {
  const date = dateRangeField({
    name: "rangefield",
    label: "Date range field",
    required: true,
    validators: [],
  });

  test("datepicker widget", async () => {
    const now = new Date();
    const later = addDays(now, 5);
    let data: DateRange = {
      from: now,
      to: later,
    };
    const changeData = (value: unknown) => {
      data = value as DateRange;
    };
    const { findByPlaceholderText } = render(
      <FormComponentView
        name="rangefield"
        onChange={changeData}
        component={date}
        theme={basic}
        value={data}
      />
    );
    const fromElement = (await findByPlaceholderText(
      "From"
    )) as HTMLInputElement;
    const toElement = (await findByPlaceholderText("To")) as HTMLInputElement;
    const currentDateString = format(now, "P");
    const laterDateString = format(later, "P");
    expect(fromElement.value).toBe(currentDateString);
    expect(toElement.value).toBe(laterDateString);
    fireEvent.input(fromElement, {
      value: "2020-01-01",
      target: { value: "2020-01-01" },
    });
    fireEvent.input(toElement, {
      value: "2021-01-01",
      target: { value: "2021-01-01" },
    });
    await waitFor(async () => {
      expect(data.from.getFullYear()).toBe(2020);
      expect(data.from.getMonth()).toBe(0);
      expect(data.from.getDate()).toBe(1);
      expect(data.to).toBeDefined();
      if (data.to) {
        expect(data.to.getFullYear()).toBe(2021);
        expect(data.to.getMonth()).toBe(0);
        expect(data.to.getDate()).toBe(1);
      }
    });
  });
});
