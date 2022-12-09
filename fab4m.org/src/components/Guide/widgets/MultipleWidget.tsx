import React from "react";
import { createForm, textField, StatefulFormView, tagsWidget } from "fab4m";

const form = createForm({
  tags: textField({
    label: "Tags",
    multiple: true,
    multipleWidget: tagsWidget(),
  }),
});

export default function MultipleWidgetExample() {
  return <StatefulFormView form={form} hideSubmit={true} />;
}
