import React, { useState } from "react";
import {
  createForm,
  textField,
  integerField,
  booleanField,
  textAreaWidget,
  StatefulFormView,
  pageBreak,
} from "@fab4m/fab4m";

const partValidateForm = createForm({
  name: textField({ label: "Name" }),
  age: integerField({ label: "Age" }),
  confirmAge: booleanField({
    required: true,
    label: "I confirm I'm at least 18 years of age",
  }),
  break: pageBreak({}),
  bio: textField({ label: "Bio", widget: textAreaWidget() }),
});
export function OnPartValidateForm() {
  const [completed, changeCompleted] = useState(false);
  partValidateForm
    .onPartValidate(async (part, data) => {
      if (part === 0) {
        const errors = [];
        if (data.age < 18) {
          errors.push({ path: "/age", message: "You are under age" });
        }
        if (data.name.toLowerCase().includes("sam")) {
          errors.push({ path: "/name", message: "Sam is always under age" });
        }
        return errors;
      }
      if (
        part === 1 &&
        data.name.toLowerCase().includes("fabian") &&
        data.bio.toLowerCase().includes("computer science")
      ) {
        return [{ path: "/bio", message: "Consider a different profession" }];
      }
    })
    .onSubmit((e) => {
      e.preventDefault();
      changeCompleted(true);
    });
  return completed ? (
    <p>Welcome, you're the right person for the job!</p>
  ) : (
    <StatefulFormView form={partValidateForm} />
  );
}
