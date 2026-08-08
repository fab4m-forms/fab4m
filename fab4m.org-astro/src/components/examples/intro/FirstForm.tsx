import React from "react";
import { createForm, textField } from "@fab4m/fab4m";
import {
  StatefulFormView,
  FormProvider,
  allWidgetsRenderer,
} from "@fab4m/react";

const form = createForm({
  name: textField({
    label: "Your name",
  }),
});

export default function FirstFormExample() {
  return (
    <FormProvider renderer={allWidgetsRenderer}>
      <StatefulFormView form={form} />
    </FormProvider>
  );
}
