---
title: Introducing the variants API!
---
# Introducing the variants API
Since releasing the first beta version of Fab4m I have run a few pilot projects with it.
One thing I quickly realized is that you quite often need to change many aspects of your
form depending on the current form state. That's what the Variants API is here for!
<!--truncate-->

The first version of fab4m had the rules API which allowed you to show fields depending on
the value of other fields. This is probably the most common use case, and the API will stay
as it is so that you can use it for that.

Things are not always that simple though. You might want to change many other things about your
form as the state changes. For example, some fields might need to be required depending on if
you check some checkbox, or you might have to change the description of a field, or make it
multiple choice instead of single choice.

The variants API is designed to allow you to change all aspects of any component in your form depending
on the state of the rest of the form. It uses the same validators as the rules API.

Here's an example:

```typescript jsx
import {booleanField, createForm,exists,textAreaField } from "@fab4m/fab4m";
const form = createForm({
  likeBio: booleanField({ label: "Do you like to talk about yourself?" }),
  bio: [
    // This variant is defined like a rule. If the rule is true,
    // then the variant is activated.
    [
      "likeBio",
      exists(),
      textAreaField({
        label: "You have to write your bio now!",
        required: true,
      }),
    ],
    // You can also provide a component without a rule. If you reach this point,
    // then the component will be rendered.
    textAreaField({ label: "Biography" }),
  ],
});
```

You can read the full documentation [here](/docs/guide/variants).