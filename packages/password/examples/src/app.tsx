import * as React from "react";
import {
  createForm,
  StatefulFormView,
  bulma,
  basic,
  FormComponentView,
  textField,
  selectWidget,
  setDefaultTheme,
  useForm,
} from "fab4m";
import {
  passwordField,
  passwordVerifyField,
  passwordValidateOldField,
  validPassword,
} from "../../src";
import "react-datepicker/dist/react-datepicker.css";
import "./index.css";
import "fab4m/css/basic/basic.css";

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
        theme === "bulma" ? bulma : basic
      ),
    [theme]
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
      <StatefulFormView form={form} />
    </div>
  );
}
