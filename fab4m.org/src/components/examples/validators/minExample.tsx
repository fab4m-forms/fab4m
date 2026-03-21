import React from "react";
import { createForm, pageBreak, integerField, min } from "@fab4m/fab4m";
import "@fab4m/fab4m/css/basic/basic.css";
import {
  StatefulFormView,
  content,
  FormProvider,
  allWidgetsRenderer,
} from "@fab4m/react";

const form = createForm({
  minValue: integerField({
    label: "Min 10",
    validators: [min(10)],
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
