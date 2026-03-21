import React from "react";
import { createForm, textField, tagsWidget } from "@fab4m/fab4m";
import {
  StatefulFormView,
  FormProvider,
  allWidgetsRenderer,
} from "@fab4m/react";

const form = createForm({
  tags: textField({
    label: "Tags",
    multiple: true,
    multipleWidget: tagsWidget(),
  }),
});

export default function MultipleWidgetExample() {
  return (
    <FormProvider renderer={allWidgetsRenderer}>
      <StatefulFormView form={form} hideSubmit={true} />
    </FormProvider>
  );
}
