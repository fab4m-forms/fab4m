import React from "react";
import { createForm, textAreaField, StatefulFormView } from "@fab4m/fab4m";
import "@fab4m/fab4m/css/basic/basic.css";

const form = createForm({
  name: textAreaField({
    label: "Your long text",
    description: "Enter a long text",
    required: true,
  }),
});

export default function TextAreaFieldExample() {
  return <StatefulFormView form={form} hideSubmit={true} />;
}
