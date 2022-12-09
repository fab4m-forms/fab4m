import React from "react";
import { createForm, textField, selectWidget, StatefulFormView } from "fab4m";

const form = createForm({
  textSelect: textField({
    label: "Select",
    widget: selectWidget([["One", "one"], ["Two", "two"], "three"]),
  }),
});

export default function SelectWidgetExample() {
  return <StatefulFormView form={form} hideSubmit={true} />;
}
