# Fab4m

Fab4m provides a simple API for defining your forms, so you can avoid
repeating yourself with lots of tedious markup. Fab4m lets you define
the form structure and the representation at the same time.

Check the [full documentation](https://fab4m.org/) for a complete overview of the features.
## Install fab4m

Fab4m requires you to be up and running with react or preact first.
If you have a working environment with react or preact, you can install
fab4m through npm:

```bash
npm install --save @fab4m/fab4m
```

## Create your first form

```javascript
import { createForm, textField, StatefulFormView } from "@fab4m/fab4m";

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

Head over to our [step by step guide](https://fab4m.org/guide/define-a-form) to learn about more complex use cases.

# Packages

Fab4m consists of the [core package](packages/core/README.md) and several official
extra packages:

* [Date](packages/date/README.md)
* [Password](packages/password/README.md)
* [Router forms](packages/routerforms/README.md)

# License

All the code is licensed under the [MIT License.](LICENSE)
