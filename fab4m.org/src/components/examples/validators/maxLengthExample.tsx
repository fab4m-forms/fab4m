import React from "react";
import { createForm, pageBreak, textField, maxLength } from "@fab4m/fab4m";
import "@fab4m/fab4m/css/basic/basic.css";
import {
  StatefulFormView,
  content,
  FormProvider,
  allWidgetsRenderer,
} from "@fab4m/react";

const form = createForm({
  maxValue: textField({
    label: "Max length: 5",
    validators: [maxLength(5)],
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
