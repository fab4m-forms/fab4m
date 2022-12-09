import React from "react";
import { createForm, textField, StatefulFormView, selectWidget } from "fab4m";
import "fab4m/css/basic/basic.css";

const form = createForm({
  city: textField({
    label: "City",
    required: true,
    widget: selectWidget([
      // Using a string will use the value as label for the option.
      "copenhagen",
      // An array can be used where the first index is the label and the second is the label.
      ["Gothenburg", "gothenburg"],
      ["Stockholm", "stockholm"],
      // Option groups are supported by specifiying the optgroup label
      // as the first index and then an array of options as the second index.
      [
        "UK",
        [
          ["London", "london"],
          ["Cardiff", "london"],
          ["Edinburgh", "edinburg"],
        ],
      ],
    ]),
  }),
});

export default function selectExample() {
  return <StatefulFormView form={form} hideSubmit={true} />;
}
