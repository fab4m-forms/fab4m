# @fab4m/password

The `@fab4m/password` package provides form fields for passwords.

## Installation

Install the `@fab4m/password` package:

```bash
npm install --save @fab4m/password
```

## Using the password fields

The package provides the following fields:

* **passwordField**: A basic password input

* **passwordVerifyField**: A password input with a password verification input field.

* **passwordValidateOldField** A password field with a password validation input field and an extra field to verify the old password.

The following example shows all of the fields in action:

```jsx
import * as React from "react";
import { createForm, StatefulFormView, content } from "@fab4m/fab4m";
import {
  passwordField,
  passwordVerifyField,
  passwordValidateOldField,
} from "@fab4m/password";

const form = createForm({
  password: passwordField({
    label: "@fab4m/password",
  }),
  verifyDescription: content({}, () => <h3>@fab4m/password with verifaction</h3>),
  passwordVerify: passwordVerifyField({
    label: "@fab4m/password",
  }),
  validateDescription: content({}, () => <h3>@fab4m/password with validation</h3>),
  passwordValidate: passwordValidateOldField({
    label: "@fab4m/password",
  }),
}).onSubmit((e) => e.preventDefault());

export default function @fab4m/passwordFields() {
  return <StatefulFormView form={form} />;
}

```

## Widget settings

The `passwordVerifyWidget`, which is used wit the passwordVerifyField has the following settings:

* **confirmLabel**: The label of the confirm password field.

The `passwordValidateOldWidget` has the settings above and these settings:

* **oldPassowrdLabel**: The label of the old password field.

## Validating passwords

The package comes with two useful validators for your passwords:

### valid@fab4m/password

The valid@fab4m/password validator allows you to set several constraints on the inputted password:

* *minLength*: The minimal length of the password.
* *requiredLetter*: At least one letter is required.
* *requiredNumber*: At least one number is required.
* *requiredSpecialChar*: At least onje special character is required.

```jsx
import * as React from "react";
import { createForm, StatefulFormView } from "@fab4m/fab4m";
import { passwordField, valid@fab4m/password } from "@fab4m/password";

const form = createForm({
  password: passwordField({
    label: "@fab4m/password",
    validators: [
      valid@fab4m/password({
        minLength: 8,
        requiredLetter: true,
        requiredNumber: true,
        requiredSpecialChar: true,
      }),
    ],
  }),
}).onSubmit((e) => e.preventDefault());

export default function @fab4m/passwordFields() {
  return <StatefulFormView form={form} />;
}

```

### validOld@fab4m/password

If you use the passwordValdiateOldField you will need this validator to ensure that the old
password is correct. This validator enables you to validate the old password using an async
function that can call your backend to validate it.

```jsx
import * as React from "react";
import { createForm, StatefulFormView } from "@fab4m/fab4m";
import { passwordValidateOldField, validOld@fab4m/password } from "@fab4m/password";

const form = createForm({
  passwordValidate: passwordValidateOldField({
    label: "@fab4m/password",
    validators: [
      validOld@fab4m/password(async (password) => {
        // You will probably do some request to the backend here.
        return password === "oldpassword";
      }),
    ],
  }),
}).onSubmit((e) => e.preventDefault());

export default function @fab4m/passwordFields() {
  return <StatefulFormView form={form} />;
}

```

# License

All the code is licensed under the [MIT License.](LICENSE)
