# Form builder

The `@fab4m/builder` package provides the basic building blocks to create a visual
form builder UI capable of constructing fab4m forms.

## Installing

Install `@fab4m/fab4m`, `@fab4m/react`, and `@fab4m/builder`.

```bash
npm install --save @fab4m/fab4m @fab4m/react @fab4m/builder
```

The form builder is built using tailwind css, so you will need to have that installed as well.
Refer to their [documentation page](https://tailwindcss.com/docs/installation) for information on how to do that.

## Set up the form you want to edit

The form builder works with any [serialized](/guide/serializing) fab4m form, for example:

```jsx
import { createForm, serialize, textField } from "@fab4m/fab4m";
const formToEdit = serialize(
  createForm({
    component: textField({ label: "First component" }),
    second: textField({ label: "Second component" }),
  }),
);
```

## Add the form builder context

Place any components that should edit the form within the `<FormBuilderProvider>` component. This will allow you to use the form builder hooks to manipulate the form.

The form builder context takes in **plugins** for the different components, widgets and validators you
want to be able to work with inside of the form. Plugins for all fab4m core features are provided in the @fab4m/builder package.

an export containing all plugins is provided for convenience.

```jsx
import { allPlugins, FormBuilderProvider } from "@fab4m/builder";

<FormBuilderProvider form={formToEdit} plugins={allPlugins}>
  {/* You can use any part of the form builder in here. */}
</FormBuilderProvider>
```

## The FormComponents component

Start by adding the `<FormComponents>` component. This will give you a drag and drop interface
where you can drag your components around.

```jsx
import React, { useState } from "react";
import {
  FormComponents,
  FormBuilderProvider,
  allPlugins,
} from "@fab4m/builder";
import { createForm, serialize, textField } from "@fab4m/fab4m";

// The form builder works on the serialized version of the form.
const form = serialize(
  createForm({
    component: textField({ label: "First component" }),
    second: textField({ label: "Second component" }),
  }),
);

export default function FormComponentsExample() {
  const [draft, changeDraft] = useState(form);
  return (
    <FormBuilderProvider
      form={draft}
      formChanged={changeDraft}
      plugins={allPlugins}
    >
      <FormComponents />
    </FormBuilderProvider>
  );
}

```

## Adding actions to each component

In the first step we're just able to drag the components around. The next step is to be able
to perform actions on them.

We do this by adding actions to each component:

```jsx
import { FormComponents, FormBuilderProvider } from "@fab4m/builder";
import { createForm, serialize, textField } from "@fab4m/fab4m";
import React, { useState } from "react";

const form = serialize(
  createForm({
    component: textField({ label: "First component" }),
    second: textField({ label: "Second component" }),
  }),
);

export default function FormActionsExample() {
  const [draft, changeDraft] = useState(form);
  return (
    <FormBuilderProvider form={draft} formChanged={changeDraft}>
      <FormComponents
        actions={({ component, removeComponent, updateComponent }) => (
          <>
            <button type="button" onClick={removeComponent}>
              Remove
            </button>
            <button
              type="button"
              onClick={() =>
                updateComponent({ ...component, label: "Changed component" })
              }
            >
              Change component
            </button>
          </>
        )}
      />
    </FormBuilderProvider>
  );
}

```

## Adding new components to the form

The `NewComponent` component can be used to easily provide a gallery of all availbale components that you can add, and offers the user an option to add them:

```jsx
import React, { useState } from "react";
import {
  FormComponents,
  FormBuilderProvider,
  allPlugins,
  NewComponent,
} from "@fab4m/builder";
import { createForm, serialize } from "@fab4m/fab4m";

const form = serialize(createForm({}));

export default function NewComponentsExample() {
  const [draft, changeDraft] = useState(form);
  return (
    <FormBuilderProvider
      form={draft}
      formChanged={changeDraft}
      plugins={allPlugins}
    >
      <FormComponents />
      <h2>Add new component</h2>
      <NewComponent
        attributes={{
          name: `component_${draft.components.length}`,
          label: `Component ${draft.components.length + 1}`,
        }}
      />
    </FormBuilderProvider>
  );
}

```

## Editing components

You can use the `EditFormComponent` to be able to edit any component in the form:

```jsx
import React, { useState } from "react";
import {
  FormComponents,
  FormBuilderProvider,
  allPlugins,
  EditFormComponent,
} from "@fab4m/builder";
import { createForm, serialize, textField } from "@fab4m/fab4m";

const form = serialize(
  createForm({
    item: textField({ label: "Item" }),
  }),
);

export default function NewComponentsExample() {
  const [draft, changeDraft] = useState(form);
  const [editComponent, changeEditComponent] = useState<null | string>(null);
  return (
    <FormBuilderProvider
      form={draft}
      formChanged={changeDraft}
      plugins={allPlugins}
    >
      <FormComponents
        actions={(props) => (
          <button onClick={() => changeEditComponent(props.formKey)}>
            Edit
          </button>
        )}
      />
      {editComponent ? (
        <dialog open={true} className="backdrop:bg-gray-50">
          <EditFormComponent
            componentKey={editComponent}
            componentSaved={() => changeEditComponent(null)}
          />
        </dialog>
      ) : null}
    </FormBuilderProvider>
  );
}

```

## Full example

The example below combines all the bits below to make a complete form builder.

```jsx
import React, { useState } from "react";
import {
  FormComponents,
  FormBuilderProvider,
  allPlugins,
  NewComponent,
  EditFormComponent,
} from "@fab4m/builder";
import { createForm, serialize } from "@fab4m/fab4m";

const form = serialize(createForm());
export default function FullExample() {
  const [draft, changeDraft] = useState(form);
  const [currentKey, changeCurrentKey] = useState<null | string>(null);
  return (
    <FormBuilderProvider
      form={draft}
      formChanged={changeDraft}
      plugins={allPlugins}
    >
      <FormComponents
        actions={(props) => (
          <button type="button" onClick={() => changeCurrentKey(props.formKey)}>
            Edit
          </button>
        )}
      />
      {currentKey ? (
        <div className="border bg-slate-100 p-4">
          <EditFormComponent
            componentKey={currentKey}
            componentSaved={() => changeCurrentKey(null)}
          />
        </div>
      ) : (
        <div className="border bg-slate-100 p-4">
          <NewComponent
            attributes={{
              name: `component_${draft.components.length}`,
              label: `Component ${draft.components.length + 1}`,
            }}
          />
        </div>
      )}
    </FormBuilderProvider>
  );
}

```

# License

All the code is licensed under the [GPL v3 License.](LICENSE)
