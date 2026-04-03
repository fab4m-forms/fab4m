import * as React from "react";
import { render } from "@testing-library/react";
import { createFormRenderer, FormProvider } from "@fab4m/react";
import { DatePicker, DateRangePicker, DateTimePicker } from "../src";

const dateRenderer = createFormRenderer({
  widgetComponents: {
    datepicker: DatePicker,
    dateTimePicker: DateTimePicker,
    dateRangePicker: DateRangePicker,
  },
});

export const renderWithProvider = (ui: React.ReactElement) =>
  render(<FormProvider renderer={dateRenderer}>{ui}</FormProvider>);
