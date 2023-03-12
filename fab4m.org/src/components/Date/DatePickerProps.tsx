import * as React from "react";
import { dateField, datePickerWidget } from "@fab4m/date";
import { StatefulFormView, createForm } from "@fab4m/fab4m";
import "react-datepicker/dist/react-datepicker.css";

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
      <StatefulFormView form={form} hideSubmit={true} />
    </div>
  );
}
