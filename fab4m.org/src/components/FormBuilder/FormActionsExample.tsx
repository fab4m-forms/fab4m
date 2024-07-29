import { FormComponents, FormBuilderProvider } from "@fab4m/builder";
import { createForm, serialize, textField } from "@fab4m/fab4m";
import React, { useState } from "react";

const form = serialize(
  createForm({
    component: textField({ label: "First component" }),
    second: textField({ label: "Second component" }),
  }),
);

export default function FormActionsExample() {
  const [draft, changeDraft] = useState(form);
  return (
    <FormBuilderProvider form={draft} formChanged={changeDraft}>
      <FormComponents
        actions={({ component, removeComponent, updateComponent }) => (
          <>
            <button type="button" onClick={removeComponent}>
              Remove
            </button>
            <button
              type="button"
              onClick={() =>
                updateComponent({ ...component, label: "Changed component" })
              }
            >
              Change component
            </button>
          </>
        )}
      />
    </FormBuilderProvider>
  );
}
