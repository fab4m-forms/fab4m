import React from "react";
import {
  createForm,
  and,
  integerField,
  booleanField,
  min,
  max,
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
  awkwardQuestion: booleanField({
    label: "Do you want to answer a hard question?",
  }),
  feelOld: booleanField({
    label: "Do you feel old?",
    rules: [
      or([
        and([
          ["age", min(40)],
          ["age", max(49)],
        ]),
        ["awkwardQuestion", equals(true)],
      ]),
    ],
  }),
});

export default function AndExample() {
  return (
    <FormProvider renderer={allWidgetsRenderer}>
      <StatefulFormView form={form} hideSubmit={true} />
    </FormProvider>
  );
}
