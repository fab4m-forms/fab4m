import React from "react";
import {
  createForm,
  textField,
  emailField,
  booleanField,
  pageBreak,
  StatefulFormView,
} from "@fab4m/fab4m";
import "@fab4m/fab4m/css/basic/basic.css";

const form = createForm({
  name: emailField({
    label: "Your email",
    description: "Enter your email",
    required: true,
  }),
  agree: booleanField({
    label: "Agree to the terms and conditions",
    required: true,
  }),
  break: pageBreak(),
  nickname: textField({
    label: "Nickname",
  }),
});

export default function TextFieldExample() {
  return <StatefulFormView form={form} hideSubmit={true} />;
}
