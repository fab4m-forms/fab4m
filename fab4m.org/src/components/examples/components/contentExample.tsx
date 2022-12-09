import React from "react";
import { createForm, StatefulFormView, textField, content } from "@fab4m/fab4m";
import "fab4m/css/basic/basic.css";

const form = createForm({
  name: textField({
    label: "Your name",
  }),
  content: content({}, (data) => (
    <div>
      <h2>Some inline content</h2>
      <p>
        Inline content inside of a form. You have access to the current data:
      </p>
      <p>
        <strong>Your name is:</strong> {data.name}
      </p>
    </div>
  )),
});

export default function ContentExample() {
  return <StatefulFormView form={form} hideSubmit={true} />;
}
