import React from "react";
import {
  createForm,
  group,
  textField,
  StatefulFormView,
  horizontalGroupWidget,
} from "@fab4m/fab4m";
import "@fab4m/fab4m/css/basic/basic.css";

const form = createForm({
  address: group(
    {
      label: "Address",
      widget: horizontalGroupWidget(),
    },
    {
      street: textField({
        label: "Street",
      }),
      postCode: textField({
        label: "Post Code",
      }),
      city: textField({
        label: "City",
      }),
      country: textField({
        label: "Country",
      }),
    }
  ),
});

export default function Example() {
  return <StatefulFormView form={form} hideSubmit={true} />;
}
