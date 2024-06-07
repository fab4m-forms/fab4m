import React from "react";
import ReactDOM from "react-dom/client";
import FormBuilder from "../../src/components/FormBuilder";
import { Plugins } from "../../src";
import { basic, createForm, serialize, textField } from "@fab4m/fab4m";

const plugins: Plugins = {
  types: [],
  widgets: [],
  validators: [],
};

const form = serialize(
  createForm({
    text: textField({ label: "A text field" }),
    text2: textField({ label: "Another text field" }),
  }),
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FormBuilder
      plugins={plugins}
      form={form}
      themes={[basic]}
      formChanged={(newForm) => console.log(newForm)}
    />
  </React.StrictMode>,
);
