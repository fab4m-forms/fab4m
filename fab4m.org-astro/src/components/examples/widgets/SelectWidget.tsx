import React from "react";
import { createForm, textField, selectWidget } from "@fab4m/fab4m";
import {
  StatefulFormView,
  FormProvider,
  allWidgetsRenderer,
} from "@fab4m/react";

const form = createForm({
  textSelect: textField({
    label: "Select",
    widget: selectWidget([["One", "one"], ["Two", "two"], "three"]),
  }),
});

export default function SelectWidgetExample() {
  return (
    <FormProvider renderer={allWidgetsRenderer}>
      <StatefulFormView form={form} hideSubmit={true} />
    </FormProvider>
  );
}
