import React, { useState } from "react";
import {
  FormComponents,
  FormBuilderProvider,
  allPlugins,
  FormPreview,
} from "@fab4m/builder";
import { basic, createForm, serialize, textField } from "@fab4m/fab4m";

const form = serialize(
  createForm({
    component: textField({ label: "First component" }),
    second: textField({ label: "Second component" }),
  }),
);

export default function FormPreviewExample() {
  const [draft, changeDraft] = useState(form);
  return (
    <FormBuilderProvider
      form={draft}
      formChanged={changeDraft}
      plugins={allPlugins}
    >
      <FormComponents />
      <h2>Example</h2>
      <FormPreview theme={basic} />
    </FormBuilderProvider>
  );
}
