import React from "react";
import { createForm, floatField, StatefulFormView } from "@fab4m/fab4m";
import "fab4m/css/basic/basic.css";

const form = createForm({
  name: floatField({
    label: "Enter a floating point number",
    required: true,
  }),
});

export default function floatFieldExample() {
  return <StatefulFormView form={form} hideSubmit={true} />;
}
