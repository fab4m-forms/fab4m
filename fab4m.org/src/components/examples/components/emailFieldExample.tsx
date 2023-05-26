import React from "react";
import { createForm, emailField, StatefulFormView } from "@fab4m/fab4m";
import "@fab4m/fab4m/css/basic/basic.css";

const form = createForm({
  name: emailField({
    label: "Your email",
    description: "Enter an email address",
    required: true,
  }),
});

export default function EmailFieldExample() {
  return <StatefulFormView form={form} hideSubmit={true} />;
}
