import React from "react";
import { createForm, dateField, datePickerWidget } from "@fab4m/fab4m";
import {
  StatefulFormView,
  FormProvider,
  allWidgetsRenderer,
} from "@fab4m/react";

const form = createForm({
  birthday: dateField({
    label: "Your birthday",
    widget: datePickerWidget(),
  }),
});

export default function DatePickerWidget() {
  return (
    <FormProvider renderer={allWidgetsRenderer}>
      <StatefulFormView form={form} hideSubmit={true} />
    </FormProvider>
  );
}
