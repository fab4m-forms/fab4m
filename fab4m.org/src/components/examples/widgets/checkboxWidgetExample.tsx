import React from "react";
import { createForm, booleanField, checkboxWidget } from "@fab4m/fab4m";
import {
  StatefulFormView,
  FormProvider,
  allWidgetsRenderer,
} from "@fab4m/react";

const form = createForm({
  agree: booleanField({
    label: "I agree to the terms and conditions",
    required: true,
    widget: checkboxWidget(),
  }),
});

export default function Example() {
  return (
    <FormProvider renderer={allWidgetsRenderer}>
      <StatefulFormView form={form} hideSubmit={true} />
    </FormProvider>
  );
}
