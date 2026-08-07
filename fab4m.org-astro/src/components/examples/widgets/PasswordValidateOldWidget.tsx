import * as React from "react";
import {
  createForm,
  passwordValidateOldField,
  passwordValidateOldWidget,
} from "@fab4m/fab4m";
import {
  StatefulFormView,
  FormProvider,
  allWidgetsRenderer,
} from "@fab4m/react";

const form = createForm({
  password: passwordValidateOldField({
    label: "Password",
    widget: {
      ...passwordValidateOldWidget(),
      settings: {
        confirmTitle: "Type your password again",
        oldPasswordLabel: "Your old password",
      },
    },
  }),
}).onSubmit((e) => e.preventDefault());

export default function PasswordValidateOldWidget() {
  return (
    <FormProvider renderer={allWidgetsRenderer}>
      <StatefulFormView form={form} hideSubmit={true} />
    </FormProvider>
  );
}
