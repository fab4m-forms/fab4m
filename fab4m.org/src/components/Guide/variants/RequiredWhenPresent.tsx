import * as React from "react";
import {
  textAreaField,
  booleanField,
  exists,
  createForm,
  StatefulFormView,
} from "@fab4m/fab4m";

const form = createForm({
  likeBio: booleanField({ label: "Do you like to talk about yourself?" }),
  bio: [
    // This variant is defined like a rule. If the rule is true,
    // then the variant is activated.
    [
      "likeBio",
      exists(),
      textAreaField({
        label: "You have to write your bio now!",
        required: true,
      }),
    ],
    // You can also provide a component without a rule. If you reach this point,
    // then the component will be rendered.
    textAreaField({ label: "Biography" }),
  ],
});

export default function RequiredWhenPresent() {
  return <StatefulFormView form={form} hideSubmit={true} />;
}
