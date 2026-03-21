import * as React from "react";
// This stylesheet that's needed if you use the basic theme.
import "@fab4m/autocomplete/src/style.css";
import { autocompleteWidget } from "@fab4m/autocomplete";
import { textField, createForm } from "@fab4m/fab4m";
import {
  StatefulFormView,
  FormProvider,
  allWidgetsRenderer,
} from "@fab4m/react";
const form = createForm({
  city: textField({
    label: "City",
    widget: autocompleteWidget({
      items: [
        // Either use the [label, value] format...
        ["Gothenburg", "gothenburg"],
        ["Stockholm", "stockholm"],
        // Or just use the value.
        "copenhagen",
      ],
    }),
  }),
});

export default function AutocompleteExample() {
  return (
    <FormProvider renderer={allWidgetsRenderer}>
      <StatefulFormView form={form} hideSubmit={true} />
    </FormProvider>
  );
}
