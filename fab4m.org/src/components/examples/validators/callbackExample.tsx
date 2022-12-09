import React from "react";
import {
  createForm,
  pageBreak,
  StatefulFormView,
  content,
  integerField,
  callback,
} from "@fab4m/fab4m";
import "fab4m/css/basic/basic.css";

const form = createForm({
  age: integerField({
    label: "Age",
    validators: [
      callback((value) => {
        // Just returning a condition that must pass is the simplest form.
        return value !== 27;
      }),
    ],
    required: true,
  }),
  otherAge: integerField({
    label: "Other Age",
    validators: [
      callback((value) => {
        const messages = [];
        // You can return one or more messages. The path is a json pointer
        // relative to the value.
        if (value < 18) {
          messages.push({ path: "", message: "Under age!" });
        }
        if (value < 27) {
          messages.push({ path: "", message: "Too young!" });
        }
        if (value > 27) {
          messages.push({ path: "", message: "Too old!" });
        }
        return messages;
      }),
    ],
    required: true,
  }),

  break: pageBreak(),
  content: content({}, () => <div>Great choice!</div>),
});

export default function TextFieldExample() {
  return <StatefulFormView form={form} hideSubmit={true} />;
}
