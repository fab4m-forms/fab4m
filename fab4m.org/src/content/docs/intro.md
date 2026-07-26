---
title: Introduction
description: Welcome to Fab4m - Take the hard parts out of form building!
---

# Introduction

Fab4m is a form library that helps you build forms with less effort. It provides a simple API for defining forms, validating input, and rendering forms in your preferred framework.

## Features

- **Simple API** - Define forms with a clean, declarative syntax
- **Flexible validation** - Built-in validators and custom validation logic
- **Themable** - Style your forms with CSS or use built-in themes
- **Framework agnostic** - Works with React, Vue, and other frameworks

## Quick Start

```javascript
import { form, textField, submit } from "@fab4m/fab4m";

const myForm = form({
  name: textField({ label: "Your name" }),
  submit: submit(),
});
```

## Documentation

- [Define a form](/docs/guide/define-a-form) - Learn how to define form fields
- [Rendering the form](/docs/guide/rendering-the-form) - Render your forms in React
- [Validation](/docs/guide/validation) - Add validation to your forms
- [Theming](/docs/guide/theming) - Style your forms

## License

MIT License - see [GitHub](https://github.com/fab4m-forms/fab4m) for details.