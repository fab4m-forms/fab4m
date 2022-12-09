import React from "react";
import {
  createForm,
  pageBreak,
  integerField,
  StatefulFormView,
  content,
  min,
} from "@fab4m/fab4m";
import "fab4m/css/basic/basic.css";

const form = createForm({
  minValue: integerField({
    label: "Min 10",
    validators: [min(10)],
    required: true,
  }),
  break: pageBreak(),
  content: content({}, () => <div>Great choice!</div>),
});

export default function Example() {
  return <StatefulFormView form={form} hideSubmit={true} />;
}
