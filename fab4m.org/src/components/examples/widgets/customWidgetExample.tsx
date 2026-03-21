import React from "react";
import { createForm, textField, customWidget } from "@fab4m/fab4m";
import "@fab4m/fab4m/css/basic/basic.css";
import {
  StatefulFormView,
  FormProvider,
  allWidgetsRenderer,
} from "@fab4m/react";

const form = createForm({
  field: textField({
    label: "Field",
    widget: customWidget((props) => (
      <div>
        <label htmlFor={props.id}>{props.component.label}</label>
        <input
          type="text"
          id={props.id}
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
        />
        <div>Custom text</div>
      </div>
    )),
  }),
});

export default function CustomWidgetExample() {
  return (
    <FormProvider renderer={allWidgetsRenderer}>
      <StatefulFormView form={form} hideSubmit={true} />
    </FormProvider>
  );
}
