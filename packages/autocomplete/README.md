# @fab4m/autocomplete

The `@fab4m/autocomplete` package provides an autocomplete widget component using the popular
[Downshift js package](https://www.downshift-js.com/).

## Installing

Install `@fab4m/autocomplete` and `downshift` (7.x):

```bash
npm install --save @fab4m/autocomplete downshift
```

## Using the autocomplete widget

`@fab4m/autocomplete` provides one widget: the `autocompleteWidget`.

The following example shows it in action:

```jsx
import * as React from "react";
// This stylesheet that's needed if you use the basic theme.
import "@fab4m/autocomplete/src/style.css";
import { autocompleteWidget } from "@fab4m/autocomplete";
import { StatefulFormView, textField, createForm } from "@fab4m/fab4m";
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

export default function @fab4m/autocompleteExample() {
  return <StatefulFormView form={form} hideSubmit={true} />;
}

```

## Using a callback to fetch the items

If you have many items to fetch you can use a callback to fetch the items
on the fly:

```jsx
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

export default function @fab4m/autocompleteExample() {
  return <StatefulFormView form={form} hideSubmit={true} />;
}

```

## Customizing the autocomplete item element

You might want to customize the way each item looks in the autocomplete list.
This can be done by specifying a custom `itemElement`:

```jsx
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

export default function @fab4m/autocompleteExample() {
  return <StatefulFormView form={form} hideSubmit={true} />;
}

```

# License

All the code is licensed under the [MIT License.](LICENSE)
