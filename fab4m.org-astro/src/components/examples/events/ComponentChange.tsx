import { createForm, integerField } from "@fab4m/fab4m";
import React, { useState } from "react";
import {
  StatefulFormView,
  FormProvider,
  allWidgetsRenderer,
} from "@fab4m/react";

const ageForm = createForm({
  age: integerField({ label: "Age" }),
});

export function OnComponentChangeExample() {
  // We store the age in this state.
  const [age, changeAge] = useState<number | undefined>(undefined);
  // When the age component is updated, we update our state.
  ageForm.onComponentChange((name, value) => {
    if (name === "age") {
      changeAge(value as number);
    }
  });
  // Render our form, and print out our current age when it's available.
  return (
    <>
      <FormProvider renderer={allWidgetsRenderer}>
        <StatefulFormView form={ageForm} hideSubmit={true} />
      </FormProvider>
      {age && <p style={{ fontWeight: "bold" }}>You are {age} years old</p>}
    </>
  );
}
