import "./main.css";
import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import {
  EditFormComponent,
  FormBuilderProvider,
  FormComponents,
  NewComponent,
  allPlugins,
  defaultIcons,
} from "../../src";
import { createForm, serialize, textField } from "@fab4m/fab4m";

const form = serialize(
  createForm({
    text: textField({ label: "A text field" }),
    text2: textField({ label: "Another text field" }),
  }),
);

function FormBuilder() {
  const [draft, changeDraft] = React.useState(form);
  const [currentKey, changeCurrentKey] = useState<null | string>(null);
  return (
    <div className="max-w-screen-lg mx-auto my-6">
      <h1 className="font-bold text-4xl my-4">Form builder</h1>
      <FormBuilderProvider
        plugins={allPlugins}
        form={draft}
        formChanged={changeDraft}
        icons={defaultIcons}
      >
        <FormComponents
          actions={(props) => (
            <button
              type="button"
              onClick={() => changeCurrentKey(props.formKey)}
            >
              Edit
            </button>
          )}
        />
        {currentKey ? (
          <div className="border bg-slate-100 p-4">
            <EditFormComponent
              componentKey={currentKey}
              componentSaved={() => changeCurrentKey(null)}
            />
          </div>
        ) : (
          <div className="border bg-slate-100 p-4">
            <NewComponent
              attributes={{
                name: `component_${draft.components.length}`,
                label: `Component ${draft.components.length + 1}`,
              }}
            />
          </div>
        )}
      </FormBuilderProvider>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FormBuilder />
  </React.StrictMode>,
);
