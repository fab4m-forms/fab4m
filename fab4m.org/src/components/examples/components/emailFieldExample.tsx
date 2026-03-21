import React from "react";
import { createForm, emailField } from "@fab4m/fab4m";
import "@fab4m/fab4m/css/basic/basic.css";
import {
  StatefulFormView,
  FormProvider,
  allWidgetsRenderer,
} from "@fab4m/react";

const form = createForm({
  name: emailField({
    label: "Your email",
    description: "Enter an email address",
    required: true,
  }),
});

export default function EmailFieldExample() {
  return (
    <FormProvider renderer={allWidgetsRenderer}>
      <StatefulFormView form={form} hideSubmit={true} />
    </FormProvider>
  );
}
