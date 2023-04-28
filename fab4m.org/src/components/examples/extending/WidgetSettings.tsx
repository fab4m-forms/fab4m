import React from "react";
import { createForm, textField, StatefulFormView, widget } from "@fab4m/fab4m";
import "@fab4m/fab4m/css/basic/basic.css";

type CustomWidgetSettings = {
  color: string;
};

function myCustomWidget(settings: CustomWidgetSettings) {
  return widget<string, CustomWidgetSettings>({
    type: {
      widget: (props) => {
        return (
          <input
            type="text"
            name={props.name}
            id={props.id}
            style={{ background: props.settings.color }}
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
    settings,
  });
}

const form = createForm({
  name: textField({
    label: "Your name",
    required: true,
    widget: myCustomWidget({ color: "blue" }),
  }),
});

export default function CustomWidgetExample() {
  return <StatefulFormView form={form} hideSubmit={true} />;
}
