import * as React from "react";
import { createForm, StatefulFormView } from "fab4m";
import { passwordValidateOldField, validOldPassword } from "@fab4m/password";

const form = createForm({
  passwordValidate: passwordValidateOldField({
    label: "Password",
    validators: [
      validOldPassword(async (password) => {
        // You will probably do some request to the backend here.
        return password === "oldpassword";
      }),
    ],
  }),
}).onSubmit((e) => e.preventDefault());

export default function PasswordFields() {
  return <StatefulFormView form={form} />;
}
