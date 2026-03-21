import React from "react";
import { createForm, booleanField } from "@fab4m/fab4m";
import "@fab4m/fab4m/css/basic/basic.css";
import {
  StatefulFormView,
  content,
  FormProvider,
  allWidgetsRenderer,
} from "@fab4m/react";

const form = createForm({
  agree: booleanField({
    label: "I agree to the terms and conditions",
  }),
  content: content({}, () => <div>Great choice!</div>),
});

export default function TextFieldExample() {
  return (
    <FormProvider renderer={allWidgetsRenderer}>
      <StatefulFormView form={form} hideSubmit={true} />
    </FormProvider>
  );
}
