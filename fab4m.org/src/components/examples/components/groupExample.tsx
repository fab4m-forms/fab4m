import React from "react";
import { createForm, group, textField, StatefulFormView } from "@fab4m/fab4m";
import "fab4m/css/basic/basic.css";

const form = createForm({
  groupOfFields: group(
    {
      label: "Countries",
      multiple: true,
      minItems: 1,
    },
    {
      name: textField({
        label: "Country name",
      }),
      capital: textField({
        label: "Capital",
      }),
    }
  ),
});

export default function TextFieldExample() {
  return <StatefulFormView form={form} hideSubmit={true} />;
}
