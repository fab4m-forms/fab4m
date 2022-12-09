import React from "react";
import { createForm, booleanField, StatefulFormView } from "fab4m";
import "fab4m/css/basic/basic.css";

const form = createForm({
  name: booleanField({
    label: "I agree to the terms and conditions",
  }),
});

export default function BooleanFieldExample() {
  return <StatefulFormView form={form} hideSubmit={true} />;
}
