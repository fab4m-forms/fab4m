import * as React from "react";
import { createForm, passwordField, passwordWidget } from "@fab4m/fab4m";
import {
  StatefulFormView,
  FormProvider,
  allWidgetsRenderer,
} from "@fab4m/react";

const form = createForm({
  password: passwordField({
    label: "Password",
    widget: passwordWidget(),
  }),
}).onSubmit((e) => e.preventDefault());

export default function PasswordWidget() {
  return (
    <FormProvider renderer={allWidgetsRenderer}>
      <StatefulFormView form={form} hideSubmit={true} />
    </FormProvider>
  );
}
