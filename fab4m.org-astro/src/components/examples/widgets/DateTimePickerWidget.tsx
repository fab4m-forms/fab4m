import React from "react";
import { createForm, dateTimeField, dateTimePickerWidget } from "@fab4m/fab4m";
import {
  StatefulFormView,
  FormProvider,
  allWidgetsRenderer,
} from "@fab4m/react";

const form = createForm({
  appointment: dateTimeField({
    label: "Your appointment time",
    widget: dateTimePickerWidget(),
  }),
});

export default function DateTimePickerWidget() {
  return (
    <FormProvider renderer={allWidgetsRenderer}>
      <StatefulFormView form={form} hideSubmit={true} />
    </FormProvider>
  );
}
