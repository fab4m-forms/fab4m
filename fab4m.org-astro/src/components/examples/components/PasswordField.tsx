import * as React from "react";
import { createForm, passwordField } from "@fab4m/fab4m";
import {
  StatefulFormView,
  FormProvider,
  allWidgetsRenderer,
} from "@fab4m/react";

const form = createForm({
  password: passwordField({
    label: "Password",
  }),
}).onSubmit((e) => e.preventDefault());

export default function PasswordField() {
  return (
    <FormProvider renderer={allWidgetsRenderer}>
      <StatefulFormView form={form} />
    </FormProvider>
  );
}
