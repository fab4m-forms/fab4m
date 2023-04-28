import React from "react";
import {
  createForm,
  textField,
  StatefulFormView,
  widget,
  FormComponentWrapper,
} from "@fab4m/fab4m";
import "@fab4m/fab4m/css/basic/basic.css";

const fab4mWidget = widget({
  type: {
    widget: (props) => {
      return (
        <FormComponentWrapper {...props}>
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
        </FormComponentWrapper>
      );
    },
  },
});

const form = createForm({
  name: textField({
    label: "Your name",
    required: true,
    widget: fab4mWidget,
  }),
});

export default function CustomWidgetExample() {
  return <StatefulFormView form={form} hideSubmit={true} />;
}
