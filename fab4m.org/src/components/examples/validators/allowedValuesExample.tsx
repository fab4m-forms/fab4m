import React from "react";
import { createForm, pageBreak, textField, allowedValues } from "@fab4m/fab4m";
import "@fab4m/fab4m/css/basic/basic.css";
import {
  StatefulFormView,
  content,
  FormProvider,
  allWidgetsRenderer,
} from "@fab4m/react";

const form = createForm({
  city: textField({
    label: "City",
    validators: [
      allowedValues(
        ["Gothenburg", "Stockholm"],
        "Choose either Stockholm or Gothenburg",
      ),
    ],
    required: true,
  }),
  break: pageBreak(),
  content: content({}, () => <div>Great choice!</div>),
});

export default function TextFieldExample() {
  return (
    <FormProvider renderer={allWidgetsRenderer}>
      <StatefulFormView form={form} hideSubmit={true} />
    </FormProvider>
  );
}
