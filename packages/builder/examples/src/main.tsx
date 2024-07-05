import React from "react";
import ReactDOM from "react-dom/client";
import { EditFormComponent, FormBuilderProvider, allPlugins } from "../../src";
import {
  SerializedComponent,
  createForm,
  serialize,
  textField,
} from "@fab4m/fab4m";

const form = serialize(
  createForm({
    text: textField({ label: "A text field" }),
    text2: textField({ label: "Another text field" }),
  }),
);

function FormBuilder() {
  const [draft, changeDraft] = React.useState(form);
  return (
    <FormBuilderProvider
      plugins={allPlugins}
      form={draft}
      formChanged={changeDraft}
    >
      <EditFormComponent
        component={draft.components[0] as SerializedComponent}
      />
    </FormBuilderProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FormBuilder />
  </React.StrictMode>,
);
