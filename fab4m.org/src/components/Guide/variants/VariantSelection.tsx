import * as React from "react";
import {
  booleanField,
  textField,
  equals,
  content,
  createForm,
  StatefulFormView,
  selectWidget,
} from "@fab4m/fab4m";

const form = createForm({
  city: textField({
    label: "Select your city",
    widget: selectWidget(["London", "Paris", "New york"]),
  }),
  attractions: [
    // This variant is defined like a rule. If the rule is true,
    // then the variant is activated.
    [
      "city",
      equals("Paris"),
      booleanField({
        label: "I visited the eiffel tower",
        required: true,
      }),
    ],
    [
      "city",
      equals("London"),
      booleanField({
        label: "I visited Buckinghamn palace",
        required: true,
      }),
    ],
    [
      "city",
      equals("New york"),
      booleanField({
        label: "I visited the statue of liberty",
        required: true,
      }),
    ],
    content(
      {},
      () => "Select a city to tell us if you visited a popular attraction!"
    ),
  ],
});

export default function VariantSelection() {
  return <StatefulFormView form={form} hideSubmit={true} />;
}
