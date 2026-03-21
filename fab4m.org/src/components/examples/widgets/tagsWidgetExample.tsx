import React from "react";
import { createForm, textField, selectWidget, tagsWidget } from "@fab4m/fab4m";
import "@fab4m/fab4m/css/basic/basic.css";
import {
  StatefulFormView,
  FormProvider,
  allWidgetsRenderer,
} from "@fab4m/react";

const form = createForm({
  city: textField({
    label: "Which cities did you visit?",
    required: true,
    multiple: true,
    multipleWidget: tagsWidget(),
    widget: selectWidget([
      ["Gothenburg", "gothenburg"],
      ["Stockholm", "stockholm"],
    ]),
  }),
  tags: textField({
    label: "Write some words to describe your stay",
    multiple: true,
    multipleWidget: tagsWidget({}),
  }),
});

export default function selectExample() {
  return (
    <FormProvider renderer={allWidgetsRenderer}>
      <StatefulFormView form={form} hideSubmit={true} />
    </FormProvider>
  );
}
