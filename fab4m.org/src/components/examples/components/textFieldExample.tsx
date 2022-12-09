import React from "react";
import { createForm, textField, StatefulFormView } from "fab4m";
import "fab4m/css/basic/basic.css";

const form = createForm({
  name: textField({
    label: "Your name",
    description: "Enter your full name",
    required: true,
  }),
});

export default function TextFieldExample() {
  return <StatefulFormView form={form} hideSubmit={true} />;
}
