import * as React from "react";
import { textField, createForm, StatefulFormView } from "@fab4m/fab4m";

const form = createForm({
  text: textField({ label: "Text field" }),
});

export default function StatefulFormExample() {
  return <StatefulFormView form={form} />;
}
