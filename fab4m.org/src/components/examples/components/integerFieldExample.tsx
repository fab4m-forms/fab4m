import React from "react";
import { createForm, integerField, StatefulFormView } from "@fab4m/fab4m";
import "fab4m/css/basic/basic.css";

const form = createForm({
  name: integerField({
    label: "Enter a number",
    required: true,
  }),
});

export default function floatFieldExample() {
  return <StatefulFormView form={form} hideSubmit={true} />;
}
