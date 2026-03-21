import React from "react";
import { createForm, pageBreak, integerField, max } from "@fab4m/fab4m";
import "@fab4m/fab4m/css/basic/basic.css";
import {
  StatefulFormView,
  content,
  FormProvider,
  allWidgetsRenderer,
} from "@fab4m/react";

const form = createForm({
  maxValue: integerField({
    label: "Max 10",
    validators: [max(10)],
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
