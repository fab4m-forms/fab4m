import React from "react";
import {
  createForm,
  textField,
  booleanField,
  integerField,
  emailField,
  pageBreak,
} from "@fab4m/fab4m";
import {
  content,
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
  email: emailField({ label: "Email" }),
  break1: pageBreak({}),
  age: integerField({ label: "Age" }),
  city: textField({ label: "City" }),
  break2: pageBreak({}),
  terms: content({}, () => (
    <div
      style={{
        padding: "1rem",
        background: "var(--sl-color-gray-6)",
        borderRadius: "0.25rem",
      }}
    >
      Very long terms and conditions...
    </div>
  )),
  agree: booleanField({
    label: "I agree to the terms and conditions",
    required: true,
  }),
});

export default function PageBreaks() {
  form.onSubmit((e) => {
    e.preventDefault();
    alert("Form submitted!");
  });

  return (
    <FormProvider renderer={allWidgetsRenderer}>
      <StatefulFormView form={form} />
    </FormProvider>
  );
}
