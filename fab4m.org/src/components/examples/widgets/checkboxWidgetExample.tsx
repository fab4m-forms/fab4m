import React from "react";
import {
  createForm,
  booleanField,
  checkboxWidget,
  StatefulFormView,
} from "@fab4m/fab4m";

const form = createForm({
  agree: booleanField({
    label: "I agree to the terms and conditions",
    required: true,
    widget: checkboxWidget(),
  }),
});

export default function Example() {
  return <StatefulFormView form={form} hideSubmit={true} />;
}
