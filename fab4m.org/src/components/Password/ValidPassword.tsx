import * as React from "react";
import { createForm } from "@fab4m/fab4m";
import {
  StatefulFormView,
  FormProvider,
  allWidgetsRenderer,
} from "@fab4m/react";
import { passwordField, validPassword, Password } from "@fab4m/password";

const passwordRenderer = {
  ...allWidgetsRenderer,
  widgetComponents: {
    ...allWidgetsRenderer.widgetComponents,
    password: Password,
  },
};

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
    <FormProvider renderer={passwordRenderer}>
      <StatefulFormView form={form} />
    </FormProvider>
  );
}
