import React from "react";
import { createForm, pageBreak, textField, minLength } from "@fab4m/fab4m";
import "@fab4m/fab4m/css/basic/basic.css";
import {
  StatefulFormView,
  content,
  FormProvider,
  allWidgetsRenderer,
} from "@fab4m/react";

const form = createForm({
  minValue: textField({
    label: "Min length: 5",
    validators: [minLength(5)],
    required: true,
  }),
  break: pageBreak(),
  content: content({}, () => <div>Great choice!</div>),
});

export default function Example() {
  return (
    <FormProvider renderer={allWidgetsRenderer}>
      <StatefulFormView form={form} hideSubmit={true} />
    </FormProvider>
  );
}
