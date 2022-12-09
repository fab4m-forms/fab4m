import { createForm, integerField, StatefulFormView } from "fab4m";
import React, { useState } from "react";

const ageForm = createForm({
  age: integerField({ label: "Age" }),
});

export function OnComponentChangeExample() {
  // We store the age in this state.
  const [age, changeAge] = useState(undefined);
  // When the age component is updated, we update our state.
  ageForm.onComponentChange((name, value) => {
    if (name === "age") {
      changeAge(value);
    }
  });
  // Render our form, and print out our current age when it's available.
  return (
    <>
      <StatefulFormView form={ageForm} hideSubmit={true} />
      {age && <p style={{ fontWeight: "bold" }}>You are {age} years old</p>}
    </>
  );
}
