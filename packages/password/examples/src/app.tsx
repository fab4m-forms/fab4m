import * as React from "react";
import { createForm, bulma, basic, textField, selectWidget } from "@fab4m/fab4m";
import {
  StatefulFormView,
  FormComponentView,
  FormProvider,
  useForm,
} from "@fab4m/react";
import {
  passwordField,
  passwordVerifyField,
  passwordValidateOldField,
  validPassword,
  passwordRenderer,
} from "../../src";
import "react-datepicker/dist/react-datepicker.css";
import "./index.css";
import "@fab4m/fab4m/css/basic/basic.css";

export default function App() {
  const [theme, changeTheme] = React.useState("basic");
  const form = useForm(
    () =>
      createForm(
        {
          password: passwordField({
            label: "Password",
            validators: [validPassword()],
          }),
          password_verify: passwordVerifyField({
            label: "Password with verify",
          }),
          password_old: passwordValidateOldField({
            label: "password with old password field",
          }),
        },
        {},
        theme === "bulma" ? bulma : basic,
      ),
    [theme],
  );

  const themeSelector = textField({
    label: "Theme",
    widget: selectWidget(["basic", "bulma"]),
  });

  return (
    <div style={{ maxWidth: "900px", padding: "1em", margin: "0 auto" }}>
      <h2 className="title">Password fields</h2>
      <FormComponentView
        name="theme"
        theme={basic}
        component={themeSelector}
        value={theme}
        onChange={changeTheme}
      />
      <FormProvider renderer={passwordRenderer}>
        <StatefulFormView form={form} />
      </FormProvider>
    </div>
  );
}
