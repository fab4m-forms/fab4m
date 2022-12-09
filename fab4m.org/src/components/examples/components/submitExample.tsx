import React from "react";
import { createForm, textField, StatefulFormView, submit } from "@fab4m/fab4m";
import "fab4m/css/basic/basic.css";

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
    { title: "button text" }
  ),
  otherField: textField({
    label: "This field comes after the buttton",
  }),
}).onSubmit((e) => e.preventDefault());

export default function SubmitExample() {
  return <StatefulFormView form={form} hideSubmit={true} />;
}
