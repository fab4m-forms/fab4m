import React from "react";
import {
  createForm,
  StatefulFormView,
  content,
  booleanField,
} from "@fab4m/fab4m";
import "@fab4m/fab4m/css/basic/basic.css";

const form = createForm({
  agree: booleanField({
    label: "I agree to the terms and conditions",
  }),
  content: content({}, () => <div>Great choice!</div>),
});

export default function TextFieldExample() {
  return <StatefulFormView form={form} hideSubmit={true} />;
}
