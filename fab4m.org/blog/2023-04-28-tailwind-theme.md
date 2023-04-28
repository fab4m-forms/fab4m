---
title: Tailwind theme for fab4m
description: I finally got around to creating an official tailwind theme for fab4m! Give it a spin!
---
# Tailwind theme for fab4m

[Tailwind](https://tailwindcss.com/) seems to be everywhere nowadays. Now you use it
easily together with fab4m using the tailwind theme.

<!--truncate-->

## Install the latest version of fab4m

The tailwind theme is included in `@fab4m/fab4m` **1.0.0-beta11**. make sure you install the latest version by updating your dependencies.

## Configure tailwind

Check the [documentation](/docs/guide/theming#using-the-tailwind-theme) on how to configure tailwind to find the classes from fab4m. The gist of it is that you need to add this to your `tailwind.config.ts`:

```js
module.exports = {
  content: [
    // Your entries...
    './node_modules/@fab4m/fab4m/dist/index.es.js',
  // ...
};
```


## Use the default tailwind theme

If you just want to give the new theme a spin you can do it by setting it up as your
default theme:
```jsx
import { setDefaultTheme, tailwind } from "@fab4m/fab4m";
setDefaultTheme(tailwind);
```

## Customizing

You probably want to customize things to fit your design. I tried to make this
easy by adding a `createTailwindTheme` function:

```jsx
import { createTailwindTheme } from "@fab4m/core";
const yourTheme = createTailwindTheme({
  settings: {
    primaryBg: "bg-green-700 hover:bg-green-900",
    secondaryBg:
      "bg-slate-500 hover:bg-slate-900 dark:bg-slate-800 dark:hover:bg-slate-500",
    inputBorder: "border border-slate-300 dark:border-slate-500",
    inputBg: "bg-white dark:bg-slate-700",
    inputText: "text-white dark:text-slate-100",
    inputHeight: "h-10",
  }
});
setDefaultTheme(yourTheme);
```

Of course, you can customize everything after the theme has been created too:

```jsx
yourTheme.classes.label = "text-slate-800";
```

And that's it. Please file an issue if you're having difficulties or suggestions for
improvements!
