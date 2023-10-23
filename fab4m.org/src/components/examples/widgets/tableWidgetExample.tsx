import React from "react";
import {
  createForm,
  textField,
  StatefulFormView,
  selectWidget,
  tableWidget,
  booleanField,
  group,
} from "@fab4m/fab4m";
import "@fab4m/fab4m/css/basic/basic.css";

const form = createForm({
  visitors: group(
    {
      label: "Visitors",
      multiple: true,
      multipleWidget: tableWidget({
        addItemLabel: "Add visitor",
        removeItemLabel: "Remove",
      }),
    },
    {
      name: textField({
        label: "Name",
      }),
      gender: textField({
        label: "Gender",
        widget: selectWidget(["Female", "Male", "Other"]),
      }),
      vegetarian: booleanField({
        label: "Vegetarian",
      }),
    },
  ),
});

export default function selectExample() {
  return <StatefulFormView form={form} hideSubmit={true} />;
}
