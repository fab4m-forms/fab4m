# Hello world!

It's been a long time coming, but I finally released the first beta of
fab4m, a better way to work with forms!

When working with development I always find dealing with forms to be
the most time consuming and tedious part of any project. There are
many solutions out there, but they tend to tailor to only part of the
problem: validation, rendering, and so on.

I set out to finally solve the problem once and for all. It took way
more time than I anticipated, but here it is!

What are the highlights then?

Instead of working directly with markup, you structure your form using a javascript object:

```jsx
import { createForm } from "@fab4m/fab4m";
const form = createForm({
    title: textField({ label: "Title" }),
});
```

This makes it easy to build your structure however you like without having to think about how to structure the markup.

The form is made up from [components](/docs/guide/define-a-form). The component describes one part of the form and the data that it contains.

Each component can have different widgets. The widget is responsible for rendering the component:

```
const form = createForm({
    title: textField({ label: "Title", widget: optionsWidget({}, ["one", "two"] }),
});
```


In addition to this there's also [validators](/docs/guide/validators) and visibility rules to make it easy to validate your form.

Fab4m allows you to easily validate form submissions anywhere. You can generate a [JSON Schema](https://json-schema.org/) from any form.

The whole form structure can be [serialized](/docs/guide/serializing) so that it can
be stored easily.

There are many more features, have a look in the [docs](/docs/intro) and try it out!
