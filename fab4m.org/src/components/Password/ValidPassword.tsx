import * as React from "react";
import { createForm } from "@fab4m/fab4m";
import { passwordField, validPassword } from "@fab4m/password";
import {
  StatefulFormView,
  FormProvider,
  allWidgetsRenderer,
} from "@fab4m/react";

const form = createForm({
  password: passwordField({
    label: "Password",
    validators: [
      validPassword({
        minLength: 8,
        requiredLetter: true,
        requiredNumber: true,
        requiredSpecialChar: true,
      }),
    ],
  }),
}).onSubmit((e) => e.preventDefault());

export default function PasswordFields() {
  return (
    <FormProvider renderer={allWidgetsRenderer}>
      <StatefulFormView form={form} />
    </FormProvider>
  );
}
