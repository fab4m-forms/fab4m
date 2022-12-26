import * as React from "react";
import "@fab4m/autocomplete/src/style.css";
import { autocompleteWidget } from "@fab4m/autocomplete";
import { StatefulFormView, textField, createForm } from "@fab4m/fab4m";

// This would be your actual call to the backend.
async function fakeFetch(search: string) {
  const data = [
    ["Gothenburg", "gothenburg"],
    ["Stockholm", "stockholm"],
  ];
  return data.filter((item) =>
    item[0].toLowerCase().includes(search.toLowerCase())
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
  return <StatefulFormView form={form} hideSubmit={true} />;
}
