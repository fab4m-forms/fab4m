import React from "react";
import {
  createForm,
  group,
  textField,
  StatefulFormView,
  fieldsetWidget,
} from "@fab4m/fab4m";
import "fab4m/css/basic/basic.css";

const form = createForm({
  address: group(
    {
      label: "Address",
      widget: fieldsetWidget(),
    },
    {
      street: textField({
        label: "Country name",
      }),
      postCode: textField({
        label: "Country name",
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
