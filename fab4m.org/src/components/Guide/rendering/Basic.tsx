import React from "react";
import { textField, createForm } from "@fab4m/fab4m";
import { FormView, FormProvider, allWidgetsRenderer } from "@fab4m/react";

const form = createForm({
  text: textField({ label: "Text field" }),
});

export default function BasicExample() {
  return (
    <FormProvider renderer={allWidgetsRenderer}>
      <FormView form={form} data={{ text: "Some text" }} />
    </FormProvider>
  );
}
