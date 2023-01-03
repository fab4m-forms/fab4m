import * as React from "react";
import "@fab4m/autocomplete/src/style.css";
import { autocompleteWidget } from "@fab4m/autocomplete";
import { StatefulFormView, textField, createForm } from "@fab4m/fab4m";

const descriptions = {
  gothenburg: {
    title: "Gothenburg",
    description: "City of the brave!",
  },
  stockholm: {
    title: "Stockholm",
    description: "City on the wrong side of the country.",
  },
};

const form = createForm({
  city: textField({
    label: "City",
    widget: autocompleteWidget({
      items: ["gothenburg", "stockholm"],
      itemElement: (value) => {
        const info = descriptions[value];
        return (
          <div>
            <h3>{info.title}</h3>
            <p>{info.description}</p>
          </div>
        );
      },
    }),
  }),
});

export default function AutocompleteExample() {
  return <StatefulFormView form={form} hideSubmit={true} />;
}
