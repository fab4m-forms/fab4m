import * as React from "react";
import { dateField, datePickerWidget } from "@fab4m/date";
import { StatefulFormView, createForm } from "@fab4m/fab4m";
import "react-datepicker/dist/react-datepicker.css";

const form = createForm({
  birthday: dateField({
    label: "Inline datepicker",
    widget: datePickerWidget({
      datePickerProps: { inline: true },
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
