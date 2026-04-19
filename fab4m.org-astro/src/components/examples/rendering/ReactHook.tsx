import * as React from "react";
import { textField, createForm } from "@fab4m/fab4m";
import {
  StatefulFormView,
  useForm,
  FormProvider,
  allWidgetsRenderer,
} from "@fab4m/react";

export default function HookExample() {
  const form = useForm(() =>
    createForm({ text: textField({ label: "text field" }) }),
  );
  return (
    <FormProvider renderer={allWidgetsRenderer}>
      <StatefulFormView form={form} />
    </FormProvider>
  );
}
