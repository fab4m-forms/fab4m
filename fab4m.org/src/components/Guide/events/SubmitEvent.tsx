import {
  createForm,
  textField,
  integerField,
  textAreaWidget,
  StatefulFormView,
} from "fab4m";
import React, { useState } from "react";

const form = createForm({
  name: textField({ label: "Name" }),
  bio: textField({ label: "Bio", widget: textAreaWidget() }),
  age: integerField({ label: "Age" }),
});

export function OnSubmitExample() {
  // This state will be updated with the data when we submit the form.
  const [submitted, changeSubmittedData] = useState(undefined);
  form.onSubmit((e, data) => {
    // The event is a React FormEvent.
    e.preventDefault();
    // We update the state with our data.
    changeSubmittedData(data);
  });
  return (
    <>
      <StatefulFormView form={form} />
      {submitted && (
        <p style={{ fontWeight: "bold" }}>Welcome {submitted.name}</p>
      )}
    </>
  );
}
