import React from "react";
import { createForm, textField, widget } from "@fab4m/fab4m";
import "@fab4m/fab4m/css/basic/basic.css";
import {
  StatefulFormView,
  FormProvider,
  allWidgetsRenderer,
} from "@fab4m/react";

const customTextFieldWidget = widget<string>({
  type: {
    widget: (props) => {
      return (
        <input
          type="text"
          name={props.name}
          id={props.id}
          required={props.component.required}
          disabled={props.component.disabled}
          value={props.value ?? ""}
          onChange={(e) => {
            props.onChange(e.currentTarget.value);
          }}
          {...props.attributes}
        />
      );
    },
  },
});

const form = createForm({
  name: textField({
    label: "Your name",
    required: true,
    widget: customTextFieldWidget,
  }),
});

export default function CustomWidgetExample() {
  return (
    <FormProvider renderer={allWidgetsRenderer}>
      <StatefulFormView form={form} hideSubmit={true} />
    </FormProvider>
  );
}
