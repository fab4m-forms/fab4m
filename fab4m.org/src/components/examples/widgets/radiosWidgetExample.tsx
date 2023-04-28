import React from "react";
import {
  createForm,
  textField,
  StatefulFormView,
  radiosWidget,
} from "@fab4m/fab4m";
import "@fab4m/fab4m/css/basic/basic.css";

const form = createForm({
  city: textField({
    label: "City",
    required: true,
    widget: radiosWidget([
      // Using a string will use the value as label for the option.
      "copenhagen",
      // An array can be used where the first index is the label and the second is the label.
      ["Gothenburg", "gothenburg"],
      ["Stockholm", "stockholm"],
    ]),
  }),
});

export default function selectExample() {
  return <StatefulFormView form={form} hideSubmit={true} />;
}
