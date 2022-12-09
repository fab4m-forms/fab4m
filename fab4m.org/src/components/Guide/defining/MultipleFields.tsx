import React, { useState } from "react";
import { createForm, textField, StatefulFormView } from "fab4m";

const form = createForm({
  foods: textField({
    label: "What would you like to eat?",
    minItems: 2,
    maxItems: 4,
    multiple: true,
    required: true,
  }),
  allergies: textField({
    label: "Specify your allergies",
    description: "Specify any allergies you have.",
    multiple: true,
  }),
});

export default function FormFields() {
  const [data, changeData] = useState(undefined);
  form.onSubmit((e, submittedData) => {
    e.preventDefault();
    // The submitted data is an object with two arrays, allergies and foods.
    changeData(submittedData);
  });
  return (
    <>
      <StatefulFormView form={form} />
      {data && (
        <div>
          <strong>Your food selection</strong>
          <ul>
            {data.foods.map((food, i) => (
              <li key={i}>{food}</li>
            ))}
          </ul>
          <strong>Allergies</strong>
          <ul>
            {data.allergies.map((allergy, i) => (
              <li key={i}>{allergy}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
