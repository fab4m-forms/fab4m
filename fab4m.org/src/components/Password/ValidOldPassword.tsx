import * as React from "react";
import { createForm } from "@fab4m/fab4m";
import {
  StatefulFormView,
  FormProvider,
  allWidgetsRenderer,
} from "@fab4m/react";
import {
  passwordValidateOldField,
  validOldPassword,
  PasswordValidateOld,
} from "@fab4m/password";

const passwordRenderer = {
  ...allWidgetsRenderer,
  widgetComponents: {
    ...allWidgetsRenderer.widgetComponents,
    passwordValidateOld: PasswordValidateOld,
  },
};

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
  return (
    <FormProvider renderer={passwordRenderer}>
      <StatefulFormView form={form} />
    </FormProvider>
  );
}
