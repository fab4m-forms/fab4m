import React from "react";
import {
  createForm,
  integerField,
  booleanField,
  min,
  equals,
  or,
} from "@fab4m/fab4m";
import "@fab4m/fab4m/css/basic/basic.css";
import {
  StatefulFormView,
  FormProvider,
  allWidgetsRenderer,
} from "@fab4m/react";

const form = createForm({
  age: integerField({
    label: "How old are you?",
  }),
  feelOld: booleanField({
    label: "Do you feel old?",
    rules: [
      or([
        ["age", min(40)],
        ["age", equals(27)],
      ]),
    ],
  }),
});

export default function OrExample() {
  return (
    <FormProvider renderer={allWidgetsRenderer}>
      <StatefulFormView form={form} hideSubmit={true} />
    </FormProvider>
  );
}
