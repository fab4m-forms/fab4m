import React, { useState } from "react";
import {
  FormComponents,
  FormBuilderProvider,
  allPlugins,
  EditFormComponent,
} from "@fab4m/builder";
import { createForm, serialize, textField } from "@fab4m/fab4m";

const form = serialize(
  createForm({
    item: textField({ label: "Item" }),
  }),
);

export default function NewComponentsExample() {
  const [draft, changeDraft] = useState(form);
  const [editComponent, changeEditComponent] = useState<null | string>(null);
  return (
    <FormBuilderProvider
      form={draft}
      formChanged={changeDraft}
      plugins={allPlugins}
    >
      <FormComponents
        actions={(props) => (
          <button onClick={() => changeEditComponent(props.formKey)}>
            Edit
          </button>
        )}
      />
      {editComponent ? (
        <dialog open={true} className="backdrop:bg-gray-50">
          <EditFormComponent
            componentKey={editComponent}
            componentSaved={() => changeEditComponent(null)}
          />
        </dialog>
      ) : null}
    </FormBuilderProvider>
  );
}
