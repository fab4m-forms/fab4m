import React, { useState } from "react";
import {
  createForm,
  textField,
  booleanField,
  integerField,
  emailField,
  content,
  pageBreak,
  StatefulFormView,
} from "fab4m";

const form = createForm({
  name: textField({
    label: "Your name",
    description: "Enter your full name",
    required: true,
  }),
  email: emailField({ label: "Email" }),
  // This is the first page break. The user will be asked to continue here.
  // After the user has continued, they can go back to edit the previous
  // parts.
  break1: pageBreak({}),
  age: integerField({ label: "Age" }),
  city: textField({ label: "City" }),
  // You can add as many page breaks as necessary.
  break2: pageBreak({}),
  terms: content({}, () => <div>Very long terms and conditions</div>),
  agree: booleanField({
    label: "I agree to the terms and conditions",
    required: true,
  }),
});

export default function PageBreaks() {
  form.onSubmit((e) => {
    e.preventDefault();
  });
  return <StatefulFormView form={form} />;
}
