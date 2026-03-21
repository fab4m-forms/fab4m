import React from "react";
import { createForm, group, textField } from "@fab4m/fab4m";
import "@fab4m/fab4m/css/basic/basic.css";
import {
  StatefulFormView,
  FormProvider,
  allWidgetsRenderer,
} from "@fab4m/react";

const form = createForm({
  groupOfFields: group(
    {
      label: "Countries",
      multiple: true,
      minItems: 1,
    },
    {
      name: textField({
        label: "Country name",
      }),
      capital: textField({
        label: "Capital",
      }),
    },
  ),
});

export default function TextFieldExample() {
  return (
    <FormProvider renderer={allWidgetsRenderer}>
      <StatefulFormView form={form} hideSubmit={true} />
    </FormProvider>
  );
}
