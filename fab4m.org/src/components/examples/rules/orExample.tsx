import React from "react";
import {
  createForm,
  integerField,
  booleanField,
  StatefulFormView,
  min,
  equals,
  or,
} from "@fab4m/fab4m";
import "fab4m/css/basic/basic.css";

const form = createForm({
  age: integerField({
    label: "How old are you?",
  }),
  feelOld: booleanField({
    label: "Do you feel old?",
    rules: [
      or([
        ["age", min(40)],
        ["age", equals(27)],
      ]),
    ],
  }),
});

export default function OrExample() {
  return <StatefulFormView form={form} hideSubmit={true} />;
}
