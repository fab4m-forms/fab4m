import * as React from "react";
import { textField, StatefulFormView, useForm, createForm } from "fab4m";

export default function HookExample() {
  const form = useForm(() =>
    createForm({ text: textField({ label: "text field" }) })
  );
  return <StatefulFormView form={form} />;
}
