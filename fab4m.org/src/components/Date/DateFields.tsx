import * as React from "react";
import { dateField, dateTimeField, dateRangeField } from "@fab4m/date";
import { StatefulFormView, createForm } from "@fab4m/fab4m";
import "react-datepicker/dist/react-datepicker.css";

const form = createForm({
  birthday: dateField({
    label: "Your birthday",
  }),
  appointment: dateTimeField({
    label: "Your appointment time",
  }),
  vacation: dateRangeField({
    label: "Enter your desired vacation",
  }),
});

export default function DateExamples() {
  const [result, changeResult] = React.useState(null);
  form.onSubmit((e, data) => {
    e.preventDefault();
    changeResult(data);
  });
  return (
    <div>
      <StatefulFormView form={form} />
      {/* The data that comes out of the form are dates. */}
      {result && (
        <dl>
          <dt>Birthday</dt>
          <dd>{result.birthday?.toLocaleString()}</dd>
          <dt>Appointment</dt>
          <dd>{result.appointment?.toLocaleString()}</dd>
          <dt>Vacation</dt>
          {/* The date range is two dates, from and to.*/}
          <dd>
            {result.vacation?.from.toLocaleString()} -{" "}
            {result.vacation?.to.toLocaleString()}
          </dd>
        </dl>
      )}
    </div>
  );
}
