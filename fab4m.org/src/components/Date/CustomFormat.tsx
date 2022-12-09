import * as React from "react";
import { dateField, datePickerWidget } from "@fab4m/date";
import { StatefulFormView, createForm } from "fab4m";
import "react-datepicker/dist/react-datepicker.css";

const form = createForm({
  birthday: dateField({
    label: "Your birthday",
    widget: datePickerWidget({
      format: "yyyy-MM-dd",
    }),
  }),
});

export default function CustomFormat() {
  return (
    <div>
      <StatefulFormView form={form} hideSubmit={true} />
    </div>
  );
}
