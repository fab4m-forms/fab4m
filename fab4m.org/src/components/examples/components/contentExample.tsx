import React from "react";
import { createForm, textField } from "@fab4m/fab4m";
import "@fab4m/fab4m/css/basic/basic.css";
import {
  StatefulFormView,
  content,
  FormProvider,
  allWidgetsRenderer,
} from "@fab4m/react";

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
  return (
    <FormProvider renderer={allWidgetsRenderer}>
      <StatefulFormView form={form} hideSubmit={true} />
    </FormProvider>
  );
}
