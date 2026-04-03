---
sidebar_position: 1
---

# Introduction

## Install fab4m

Fab4m requires you to be up and running with React or Preact first.
If you have a working environment with React or Preact, install the core package
and the React renderer package:

```bash
npm install --save @fab4m/fab4m @fab4m/react
```

## Create your first form

```javascript
import { createForm, textField } from "@fab4m/fab4m";
import { StatefulFormView, FormProvider, allWidgetsRenderer } from "@fab4m/react";

const form = createForm({
  name: textField({
    title: "Your name",
  }),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <FormProvider renderer={allWidgetsRenderer}>
    <StatefulFormView form={form} />
  </FormProvider>,
);
```

You now created your first form!

We first created the form definition, and then used the
StatefulFormView component to render it. The StatefulFormView
component provides the form with internal state management, so you don't
have to worry about that yourself.

Head over to our [step by step guide](guide/define-a-form) to learn about more complex use cases.
