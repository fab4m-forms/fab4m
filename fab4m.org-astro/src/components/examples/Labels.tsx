import React from "react";
import { createForm, textField } from "@fab4m/fab4m";
import {
  StatefulFormView,
  FormProvider,
  allWidgetsRenderer,
} from "@fab4m/react";

const form = createForm(
  {
    name: textField({
      label: "Your name",
      required: true,
    }),
  },
  { labels: { submit: "Enter your name" } },
);

export default function Labels() {
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
