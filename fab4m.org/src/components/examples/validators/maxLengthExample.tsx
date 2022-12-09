import React from "react";
import {
  createForm,
  pageBreak,
  textField,
  StatefulFormView,
  content,
  maxLength,
} from "fab4m";
import "fab4m/css/basic/basic.css";

const form = createForm({
  maxValue: textField({
    label: "Max length: 5",
    validators: [maxLength(5)],
    required: true,
  }),
  break: pageBreak(),
  content: content({}, () => <div>Great choice!</div>),
});

export default function TextFieldExample() {
  return <StatefulFormView form={form} hideSubmit={true} />;
}
