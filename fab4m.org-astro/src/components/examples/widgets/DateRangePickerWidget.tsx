import React from "react";
import {
  createForm,
  dateRangeField,
  dateRangePickerWidget,
} from "@fab4m/fab4m";
import {
  StatefulFormView,
  FormProvider,
  allWidgetsRenderer,
} from "@fab4m/react";

const form = createForm({
  vacation: dateRangeField({
    label: "Enter your desired vacation",
    widget: dateRangePickerWidget({
      fromLabel: "Start",
      toLabel: "End",
      optionalEndDate: true,
    }),
  }),
});

export default function DateRangePickerWidget() {
  return (
    <FormProvider renderer={allWidgetsRenderer}>
      <StatefulFormView form={form} hideSubmit={true} />
    </FormProvider>
  );
}
