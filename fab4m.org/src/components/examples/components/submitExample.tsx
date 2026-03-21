import React from "react";
import { createForm, textField, submit } from "@fab4m/fab4m";
import "@fab4m/fab4m/css/basic/basic.css";
import {
  StatefulFormView,
  FormProvider,
  allWidgetsRenderer,
} from "@fab4m/react";

const form = createForm({
  name: textField({
    label: "Your name",
    description: "Enter your full name",
    required: true,
  }),
  submit: submit(
    {
      label: "My submit button",
    },
    { title: "button text" },
  ),
  otherField: textField({
    label: "This field comes after the buttton",
  }),
}).onSubmit((e) => e.preventDefault());

export default function SubmitExample() {
  return (
    <FormProvider renderer={allWidgetsRenderer}>
      <StatefulFormView form={form} hideSubmit={true} />
    </FormProvider>
  );
}
