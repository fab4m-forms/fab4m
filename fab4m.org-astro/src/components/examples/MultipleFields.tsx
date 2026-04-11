import React, { useState } from "react";
import { createForm, textField } from "@fab4m/fab4m";
import {
  StatefulFormView,
  FormProvider,
  allWidgetsRenderer,
} from "@fab4m/react";

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

export default function MultipleFields() {
  const [data, changeData] = useState(undefined);

  form.onSubmit((e, submittedData) => {
    e.preventDefault();
    changeData(submittedData);
  });

  return (
    <div className="example-container">
      <style>{`
        .example-container {
          padding: 1rem;
          border: 1px solid var(--sl-color-gray-3);
          border-radius: 0.5rem;
          margin-bottom: 1rem;
          background: var(--sl-color-black);
        }
        .result-card {
          margin-top: 1rem;
          padding: 1rem;
          border: 1px solid var(--sl-color-gray-3);
          border-radius: 0.5rem;
          background: var(--sl-color-gray-7);
        }
        .result-card h4 {
          margin: 0 0 0.5rem 0;
        }
        .result-card ul {
          margin: 0;
          padding-left: 1.25rem;
        }
        .result-card li {
          margin: 0.25rem 0;
        }
      `}</style>
      <FormProvider renderer={allWidgetsRenderer}>
        <StatefulFormView form={form} />
      </FormProvider>
      {data && (
        <div className="result-card">
          <div>
            <strong>Your food selection</strong>
            <ul>
              {data.foods.map((food, i) => (
                <li key={i}>{food}</li>
              ))}
            </ul>
          </div>
          <div>
            <strong>Allergies</strong>
            <ul>
              {data.allergies?.map((allergy, i) => (
                <li key={i}>{allergy}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
