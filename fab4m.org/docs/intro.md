---
sidebar_position: 1
---
# Introduction

## Install fab4m

Fab4m requires you to be up and running with react or preact first.
If you have a working environment with react or preact, you can install
fab4m through npm:

```bash
npm install --save fab4m
```

## Create your first form

```javascript
import { createForm, textField, StatefulFormView } from fab4m;

const form = createForm({
    name: textField({
        title: "Your name"
    });
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<StatefulFormView form={form} />);

```

You now created your first form!

We first created the form definition, and then used the
StatefulFormView component to render the it. The StatefulFormView
component provides the form with an internal state so that you don't
have to worry about that, and it's the simplest way to get started.

Head over to our [step by step guide](guide/define-your-form) to learn about more complex use cases.
