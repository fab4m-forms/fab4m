import * as React from "react";
import { createForm } from "@fab4m/fab4m";
import {
  StatefulFormView,
  content,
  FormProvider,
  allWidgetsRenderer,
} from "@fab4m/react";
import {
  passwordField,
  passwordVerifyField,
  passwordValidateOldField,
} from "@fab4m/password";

const form = createForm({
  password: passwordField({
    label: "Password",
  }),
  verifyDescription: content({}, () => <h3>Password with verifaction</h3>),
  passwordVerify: passwordVerifyField({
    label: "Password",
  }),
  validateDescription: content({}, () => <h3>Password with validation</h3>),
  passwordValidate: passwordValidateOldField({
    label: "Password",
  }),
}).onSubmit((e) => e.preventDefault());

export default function PasswordFields() {
  return (
    <FormProvider renderer={allWidgetsRenderer}>
      <StatefulFormView form={form} />
    </FormProvider>
  );
}
