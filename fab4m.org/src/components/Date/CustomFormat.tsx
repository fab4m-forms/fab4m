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
      <FormProvider renderer={dateRenderer}>
        <StatefulFormView form={form} hideSubmit={true} />
      </FormProvider>
    </div>
  );
}
