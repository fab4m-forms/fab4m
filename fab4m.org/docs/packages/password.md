import Example from "@site/src/components/Example";
// Password field example
import PasswordFields from "@site/src/components/Password/PasswordFields";
import PasswordFieldsSource from "!!raw-loader!@site/src/components/Password/PasswordFields";
import ValidPassword from "@site/src/components/Password/ValidPassword";
import ValidPasswordSource from "!!raw-loader!@site/src/components/Password/ValidPassword";
import ValidOldPassword from "@site/src/components/Password/ValidOldPassword";
import ValidOldPasswordSource from "!!raw-loader!@site/src/components/Password/ValidOldPassword";

# Password

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

<Example source={PasswordFieldsSource} example={<PasswordFields />} />

## Widget settings

The `passwordVerifyWidget`, which is used wit the passwordVerifyField has the following settings:

* **confirmLabel**: The label of the confirm password field.

The `passwordValidateOldWidget` has the settings above and these settings:

* **oldPassowrdLabel**: The label of the old password field.

## Validating passwords

The package comes with two useful validators for your passwords:

### validPassword

The validPassword validator allows you to set several constraints on the inputted password:

* *minLength*: The minimal length of the password.
* *requiredLetter*: At least one letter is required.
* *requiredNumber*: At least one number is required.
* *requiredSpecialChar*: At least onje special character is required.

<Example source={ValidPasswordSource} example={<ValidPassword />} />

### validOldPassword

If you use the passwordValdiateOldField you will need this validator to ensure that the old
password is correct. This validator enables you to validate the old password using an async
function that can call your backend to validate it.

<Example source={ValidOldPasswordSource} example={<ValidOldPassword />} />
