import React, { useState } from "react";
import { FormComponents, FormBuilderProvider } from "@fab4m/builder";
import { createForm, serialize, textField } from "@fab4m/fab4m";

// The form builder works on the serialized version of the form.
const form = serialize(
  createForm({
    component: textField({ label: "First component" }),
    second: textField({ label: "Second component" }),
  }),
);

export default function FormComponentsExample() {
  const [draft, changeDraft] = useState(form);
  return (
    <FormBuilderProvider form={draft} formChanged={changeDraft}>
      <div>wtf</div>
      <FormComponents />
    </FormBuilderProvider>
  );
}
