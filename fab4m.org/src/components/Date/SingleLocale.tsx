import * as React from "react";
import { dateField, datePickerWidget } from "@fab4m/date";
import { sv } from "date-fns/locale";
import { createForm } from "@fab4m/fab4m";
import {
  StatefulFormView,
  FormProvider,
  allWidgetsRenderer,
} from "@fab4m/react";
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
      <FormProvider renderer={allWidgetsRenderer}>
        <StatefulFormView form={form} hideSubmit={true} />
      </FormProvider>
    </div>
  );
}
