import * as React from "react";
import { dateField, datePickerWidget, DatePicker } from "@fab4m/date";
import { createForm } from "@fab4m/fab4m";
import {
  StatefulFormView,
  FormProvider,
  allWidgetsRenderer,
} from "@fab4m/react";
import "react-datepicker/dist/react-datepicker.css";

const dateRenderer = {
  ...allWidgetsRenderer,
  widgetComponents: {
    ...allWidgetsRenderer.widgetComponents,
    datepicker: DatePicker,
  },
};

const form = createForm({
  inline: dateField({
    label: "Inline datepicker",
    widget: datePickerWidget({
      datePickerProps: { inline: true },
    }),
  }),
  as_function: dateField({
    label: "Start from 1990, if not selected",
    widget: datePickerWidget({
      // The props can also be a function where the current value is passed in.
      datePickerProps: (value) => ({
        openToDate: !value ? new Date("1990-01-01") : undefined,
      }),
    }),
  }),
});

export default function CustomDatePickerProps() {
  return (
    <div>
      <FormProvider renderer={dateRenderer}>
        <StatefulFormView form={form} hideSubmit={true} />
      </FormProvider>
    </div>
  );
}
