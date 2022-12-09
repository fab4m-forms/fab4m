import React from "react";
import {
  createForm,
  pageBreak,
  integerField,
  StatefulFormView,
  content,
  max,
} from "@fab4m/fab4m";
import "fab4m/css/basic/basic.css";

const form = createForm({
  maxValue: integerField({
    label: "Max 10",
    validators: [max(10)],
    required: true,
  }),
  break: pageBreak(),
  content: content({}, () => <div>Great choice!</div>),
});

export default function TextFieldExample() {
  return <StatefulFormView form={form} hideSubmit={true} />;
}
