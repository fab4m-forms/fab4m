import * as React from "react";
import { dateField, datePickerWidget } from "@fab4m/date";
import { sv } from "date-fns/locale";
import { StatefulFormView, createForm } from "fab4m";
import "react-datepicker/dist/react-datepicker.css";

const form = createForm({
  birthday: dateField({
    label: "Your birthday",
    widget: datePickerWidget({
      locale: sv,
    }),
  }),
});

export default function SingleLocale() {
  return (
    <div>
      <StatefulFormView form={form} hideSubmit={true} />
    </div>
  );
}
