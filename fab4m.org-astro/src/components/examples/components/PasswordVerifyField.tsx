import * as React from "react";
import { createForm, passwordVerifyField } from "@fab4m/fab4m";
import {
  StatefulFormView,
  FormProvider,
  allWidgetsRenderer,
} from "@fab4m/react";

const form = createForm({
  password: passwordVerifyField({
    label: "Password",
  }),
}).onSubmit((e) => e.preventDefault());

export default function PasswordVerifyField() {
  return (
    <FormProvider renderer={allWidgetsRenderer}>
      <StatefulFormView form={form} />
    </FormProvider>
  );
}
