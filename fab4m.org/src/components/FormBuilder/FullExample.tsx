import React, { useState } from "react";
import {
  FormComponents,
  FormBuilderProvider,
  allPlugins,
  NewComponent,
  EditFormComponent,
} from "@fab4m/builder";
import { createForm, serialize } from "@fab4m/fab4m";

const form = serialize(createForm());
export default function FullExample() {
  const [draft, changeDraft] = useState(form);
  const [currentKey, changeCurrentKey] = useState<null | string>(null);
  return (
    <FormBuilderProvider
      form={draft}
      formChanged={changeDraft}
      plugins={allPlugins}
    >
      <FormComponents
        actions={(props) => (
          <button type="button" onClick={() => changeCurrentKey(props.formKey)}>
            Edit
          </button>
        )}
      />
      <NewComponent
        attributes={{
          name: `component_${draft.components.length}`,
          label: `Component ${draft.components.length + 1}`,
        }}
      />
      {currentKey ? (
        <dialog open={true} className="backdrop:bg-gray-50">
          <EditFormComponent
            componentKey={currentKey}
            componentSaved={() => changeCurrentKey(null)}
          />
        </dialog>
      ) : null}
    </FormBuilderProvider>
  );
}
