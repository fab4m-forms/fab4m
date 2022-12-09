import RouterExample from "!!raw-loader!@site/../packages/routerforms/examples/src/BasicRouter";
import ExistingRouter from "!!raw-loader!@site/../packages/routerforms/examples/src/ExistingRouter";
import RouterForm from "!!raw-loader!@site/../packages/routerforms/examples/src/RouterForm";
import Rewrite from "@site/src/components/RouterRewrite";

# Router forms

The `@fab4m/routerforms` package integrates your fab4m forms with [React router](https://reactrouter.com/en/main). This allows you to render multipage forms as react router routes!

# Installing

Install the `@fab4m/routerforms` and the `react-router-dom` packages. Only react router 6 is supported:

```bash
npm install --save @fab4m/routerforms react-router-dom@6
```

# Setting it up

Create your form just as any other fab4m form, and then you use the `RouterFormView` component from this package instead of the `FormView`. This will set your form up with
a React browser router that then allows the user to navigate between the form pages
using the browser url.

```jsx
import * as React from "react";
import { createForm, textField, pageBreak } from "fab4m";
import { FormRoute } from "@fab4m/routerforms";

const form = createForm({
  text: textField({ label: "First field", required: true }),
  pagebreak: pageBreak(),
  nextText: textField({ label: "Second field" }),
});

export default function RouterExample() {
  const [data, setData] = React.useState({});
  const [submitted, setSubmitted] = React.useState(false);
  form.onDataChange(setData).onSubmit((e) => {
    e.preventDefault();
    setSubmitted(true);
  });
  return (
    <div>
      {submitted && <p>Thanks for your response!</p>}
      <FormRoute basePath="/basic-example" form={form} data={data} />
    </div>
  );
}

```

# Usage with an existing router

If you have an exising react router app you can integrate your form within that router by using the `FormRoute` or, if you don't want to handle state by yourself, the `StatefulFormRoute` compnent.

<Rewrite source={RouterExample} />

# Integrating with Remix/React router actions

Fab4m router forms have support for react router actions, you can use a
fab4m form as you would with any React router `<Form>`.

```jsx
import { createForm, textField, pageBreak } from "fab4m";
import { RouteObject } from "react-router-dom";
import { StatefulFormRoute } from "@fab4m/routerforms";

const form = createForm({
  text: textField({ label: "First field", required: true }),
  pagebreak: pageBreak(),
  nextText: textField({ label: "Second field" }),
});

export const route: RouteObject = {
  path: "/route-forms/:part",
  action: async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    console.log(data);
  },
  element: (
    <StatefulFormRoute
      form={form}
      basePath="/route-forms"
      useRouteAction={true}
    />
  ),
};

```
