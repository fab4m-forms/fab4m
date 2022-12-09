import * as React from "react";
import { createForm, StatefulFormView } from "@fab4m/fab4m";
import { dateField, dateTimeField, dateRangeField } from "../../src";
import "react-datepicker/dist/react-datepicker.css";
import "./index.css";
import "fab4m/css/basic/basic.css";

const form = createForm({
  date: dateField({
    label: "Birthday",
  }),
  date_time: dateTimeField({
    label: "Appointment",
  }),
  date_range: dateRangeField({
    label: "Date range",
  }),
});

export default function App() {
  return (
    <div style={{ maxWidth: "900px", padding: "1em", margin: "0 auto" }}>
      <h2 className="title">Date fields</h2>
      <StatefulFormView form={form} />
    </div>
  );
}
