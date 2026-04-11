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
    <div className="example-container">
      <style>{`
        .example-container {
          padding: 1rem;
          border: 1px solid var(--sl-color-gray-3);
          border-radius: 0.5rem;
          margin-bottom: 1rem;
          background: var(--sl-color-black);
        }
      `}</style>
      <FormProvider renderer={allWidgetsRenderer}>
        <StatefulFormView form={form} />
      </FormProvider>
    </div>
  );
}
