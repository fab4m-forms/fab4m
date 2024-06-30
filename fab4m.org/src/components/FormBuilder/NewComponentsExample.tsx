import React, { useState } from "react";
import {
  FormComponents,
  FormBuilderProvider,
  allPlugins,
  NewComponent,
} from "@fab4m/builder";
import { createForm, serialize } from "@fab4m/fab4m";

const form = serialize(createForm({}));

export default function NewComponentsExample() {
  const [draft, changeDraft] = useState(form);
  return (
    <FormBuilderProvider
      form={draft}
      formChanged={changeDraft}
      plugins={allPlugins}
    >
      <FormComponents />
      <h2>Add new component</h2>
      <NewComponent
        attributes={{
          name: `component_${draft.components.length}`,
          label: `Component ${draft.components.length + 1}`,
        }}
      />
    </FormBuilderProvider>
  );
}
