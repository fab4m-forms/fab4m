import React from "react";
import { createForm, urlField, StatefulFormView } from "@fab4m/fab4m";
import "@fab4m/fab4m/css/basic/basic.css";

const form = createForm({
  name: urlField({
    label: "Your website",
    required: true,
  }),
});

export default function UrlFieldExample() {
  return <StatefulFormView form={form} hideSubmit={true} />;
}
