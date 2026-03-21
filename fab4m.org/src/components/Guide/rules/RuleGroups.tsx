import React from "react";
import {
  textField,
  integerField,
  booleanField,
  equals,
  max,
  createForm,
  or,
} from "@fab4m/fab4m";
import {
  StatefulFormView,
  FormProvider,
  allWidgetsRenderer,
} from "@fab4m/react";

const form = createForm({
  city: textField({ label: "City" }),
  usage: integerField({
    label: "How may times do you use public transport per week?",
  }),
  expensive: booleanField({
    label: "Do you think public transport is too expensive?",
    rules: [
      or([
        ["city", equals("Gothenburg")],
        ["usage", max(5)],
      ]),
    ],
  }),
});

export default function BasicRules() {
  return (
    <FormProvider renderer={allWidgetsRenderer}>
      <StatefulFormView form={form} hideSubmit={true} />
    </FormProvider>
  );
}
