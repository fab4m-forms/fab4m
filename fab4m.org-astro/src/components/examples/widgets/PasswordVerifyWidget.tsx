import * as React from "react";
import {
  createForm,
  passwordVerifyField,
  passwordVerifyWidget,
} from "@fab4m/fab4m";
import {
  StatefulFormView,
  FormProvider,
  allWidgetsRenderer,
} from "@fab4m/react";

const form = createForm({
  password: passwordVerifyField({
    label: "Password",
    widget: passwordVerifyWidget("Type your password again"),
  }),
}).onSubmit((e) => e.preventDefault());

export default function PasswordVerifyWidget() {
  return (
    <FormProvider renderer={allWidgetsRenderer}>
      <StatefulFormView form={form} hideSubmit={true} />
    </FormProvider>
  );
}
