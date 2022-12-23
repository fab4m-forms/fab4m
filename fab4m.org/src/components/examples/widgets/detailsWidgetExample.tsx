import React from "react";
import {
  createForm,
  group,
  textField,
  StatefulFormView,
  detailsWidget,
} from "@fab4m/fab4m";
import "fab4m/css/basic/basic.css";

const form = createForm({
  address: group(
    {
      // The group label is used if no summary setting is specified.
      label: "Address",
      widget: detailsWidget({
        // The summary can either be any React node or a function.
        // The function gets the data of the group that you can used inside of the summary.
        summary: (data) => (
          <span>
            {data?.street ? `[${data.street}]` : "No adress specified"}
          </span>
        ),
        open: true,
      }),
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
