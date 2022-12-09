import React from "react";
import {
  createForm,
  integerField,
  booleanField,
  StatefulFormView,
  max,
  not,
} from "fab4m";
import "fab4m/css/basic/basic.css";

const form = createForm({
  age: integerField({
    label: "How old are you?",
  }),
  feelOld: booleanField({
    label: "Do you feel old?",
    rules: [not([["age", max(40)]])],
  }),
});

export default function OrExample() {
  return <StatefulFormView form={form} hideSubmit={true} />;
}
