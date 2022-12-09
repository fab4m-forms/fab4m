import React from "react";
import {
  createForm,
  pageBreak,
  textField,
  StatefulFormView,
  content,
  equals,
} from "fab4m";
import "fab4m/css/basic/basic.css";

const form = createForm({
  city: textField({
    label: "City",
    validators: [equals("Gothenburg", "The city must be Gothenburg")],
    required: true,
  }),
  break: pageBreak(),
  content: content({}, () => <div>Great choice!</div>),
});

export default function TextFieldExample() {
  return <StatefulFormView form={form} hideSubmit={true} />;
}
