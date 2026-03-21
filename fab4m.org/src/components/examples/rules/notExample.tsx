import React from "react";
import { createForm, integerField, booleanField, max, not } from "@fab4m/fab4m";
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
    rules: [not([["age", max(40)]])],
  }),
});

export default function OrExample() {
  return (
    <FormProvider renderer={allWidgetsRenderer}>
      <StatefulFormView form={form} hideSubmit={true} />
    </FormProvider>
  );
}
