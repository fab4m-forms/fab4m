# @fab4m/password

The `@fab4m/password` package provides form fields for passwords.

## Installation

Install `@fab4m/fab4m`, `@fab4m/react`, and `@fab4m/password`:

```bash
npm install --save @fab4m/fab4m @fab4m/react @fab4m/password
```

## Using the password fields

The package provides the following fields:

- **passwordField**: A basic password input

- **passwordVerifyField**: A password input with a password verification input field.

- **passwordValidateOldField** A password field with a password validation input field and an extra field to verify the old password.

The following example shows all of the fields in action:

```jsx
import * as React from "react";
import { createForm } from "@fab4m/fab4m";
import {
  StatefulFormView,
  FormProvider,
  allWidgetsRenderer,
  content,
} from "@fab4m/react";
import {
  passwordField,
  passwordVerifyField,
  passwordValidateOldField,
  Password,
  PasswordVerify,
  PasswordValidateOld,
} from "@fab4m/password";

const passwordRenderer = {
  ...allWidgetsRenderer,
  widgetComponents: {
    ...allWidgetsRenderer.widgetComponents,
    password: Password,
    passwordVerify: PasswordVerify,
    passwordValidateOld: PasswordValidateOld,
  },
};

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

export default function PasswordFields() {
  return (
    <FormProvider renderer={passwordRenderer}>
      <StatefulFormView form={form} />
    </FormProvider>
  );
}

```

## Widget settings

The `passwordVerifyWidget`, which is used wit the passwordVerifyField has the following settings:

- **confirmLabel**: The label of the confirm password field.

The `passwordValidateOldWidget` has the settings above and these settings:

- **oldPassowrdLabel**: The label of the old password field.

## Validating passwords

The package comes with two useful validators for your passwords:

### validPassword

The validPassword validator allows you to set several constraints on the inputted password:

- _minLength_: The minimal length of the password.
- _requiredLetter_: At least one letter is required.
- _requiredNumber_: At least one number is required.
- _requiredSpecialChar_: At least onje special character is required.

```jsx
import * as React from "react";
import { createForm } from "@fab4m/fab4m";
import {
  StatefulFormView,
  FormProvider,
  allWidgetsRenderer,
} from "@fab4m/react";
import { passwordField, validPassword, Password } from "@fab4m/password";

const passwordRenderer = {
  ...allWidgetsRenderer,
  widgetComponents: {
    ...allWidgetsRenderer.widgetComponents,
    password: Password,
  },
};

const form = createForm({
  password: passwordField({
    label: "@fab4m/password",
    validators: [
      validPassword({
        minLength: 8,
        requiredLetter: true,
        requiredNumber: true,
        requiredSpecialChar: true,
      }),
    ],
  }),
}).onSubmit((e) => e.preventDefault());

export default function PasswordFields() {
  return (
    <FormProvider renderer={passwordRenderer}>
      <StatefulFormView form={form} />
    </FormProvider>
  );
}

```

### validOldPassword

If you use the passwordValdiateOldField you will need this validator to ensure that the old
password is correct. This validator enables you to validate the old password using an async
function that can call your backend to validate it.

```jsx
import * as React from "react";
import { createForm } from "@fab4m/fab4m";
import {
  StatefulFormView,
  FormProvider,
  allWidgetsRenderer,
} from "@fab4m/react";
import {
  passwordValidateOldField,
  validOldPassword,
  PasswordValidateOld,
} from "@fab4m/password";

const passwordRenderer = {
  ...allWidgetsRenderer,
  widgetComponents: {
    ...allWidgetsRenderer.widgetComponents,
    passwordValidateOld: PasswordValidateOld,
  },
};

const form = createForm({
  passwordValidate: passwordValidateOldField({
    label: "@fab4m/password",
    validators: [
      validOldPassword(async (password) => {
        // You will probably do some request to the backend here.
        return password === "oldpassword";
      }),
    ],
  }),
}).onSubmit((e) => e.preventDefault());

export default function PasswordFields() {
  return (
    <FormProvider renderer={passwordRenderer}>
      <StatefulFormView form={form} />
    </FormProvider>
  );
}

```

# License

All the code is licensed under the [MIT License.](LICENSE)
