import React from "react";
import {
  createForm,
  pageBreak,
  textField,
  StatefulFormView,
  content,
  minLength,
} from "fab4m";
import "fab4m/css/basic/basic.css";

const form = createForm({
  minValue: textField({
    label: "Min length: 5",
    validators: [minLength(5)],
    required: true,
  }),
  break: pageBreak(),
  content: content({}, () => <div>Great choice!</div>),
});

export default function Example() {
  return <StatefulFormView form={form} hideSubmit={true} />;
}
