import React from "react";
import { textField, createForm, FormView } from "fab4m";

const form = createForm({
  text: textField({ label: "Text field" }),
});

export default function BasicExample() {
  return <FormView form={form} data={{ text: "Some text" }} />;
}
