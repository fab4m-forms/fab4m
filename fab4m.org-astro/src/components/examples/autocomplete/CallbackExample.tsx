import * as React from "react";
import "@fab4m/autocomplete/src/style.css";
import { Autocomplete, autocompleteWidget } from "@fab4m/autocomplete";
import { textField, createForm } from "@fab4m/fab4m";
import {
  StatefulFormView,
  FormProvider,
  allWidgetsRenderer,
} from "@fab4m/react";

const autocompleteRenderer = {
  ...allWidgetsRenderer,
  widgetComponents: {
    ...allWidgetsRenderer.widgetComponents,
    autocomplete: Autocomplete,
  },
};

// This would be your actual call to the backend.
async function fakeFetch(search: string) {
  const data = [
    ["Gothenburg", "gothenburg"],
    ["Stockholm", "stockholm"],
  ];
  return data.filter((item) =>
    item[0].toLowerCase().includes(search.toLowerCase()),
  );
}

const form = createForm({
  city: textField({
    label: "City",
    widget: autocompleteWidget({
      items: fakeFetch,
    }),
  }),
});

export default function AutocompleteExample() {
  return (
    <FormProvider renderer={autocompleteRenderer}>
      <StatefulFormView form={form} hideSubmit={true} />
    </FormProvider>
  );
}
