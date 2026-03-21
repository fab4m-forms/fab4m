import React from "react";
import { createForm, urlField } from "@fab4m/fab4m";
import "@fab4m/fab4m/css/basic/basic.css";
import {
  StatefulFormView,
  FormProvider,
  allWidgetsRenderer,
} from "@fab4m/react";

const form = createForm({
  name: urlField({
    label: "Your website",
    required: true,
  }),
});

export default function UrlFieldExample() {
  return (
    <FormProvider renderer={allWidgetsRenderer}>
      <StatefulFormView form={form} hideSubmit={true} />
    </FormProvider>
  );
}
