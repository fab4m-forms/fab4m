import React from "react";
import { createForm, fileField, StatefulFormView } from "fab4m";
import "fab4m/css/basic/basic.css";

const form = createForm({
  name: fileField({
    label: "File upload",
    required: true,
  }),
});

export default function FileFieldExample() {
  return <StatefulFormView form={form} hideSubmit={true} />;
}
