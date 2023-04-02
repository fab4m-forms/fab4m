import React from "react";
import { createForm, textField, StatefulFormView } from "@fab4m/fab4m";

const form = createForm(
  {
    name: textField({
      label: "Your name",
      required: true,
    }),
  },
  { labels: { submit: "Enter your name" } }
);

export default function PageBreaks() {
  form.onSubmit((e) => {
    e.preventDefault();
  });
  return <StatefulFormView form={form} />;
}
