import React, { useState } from "react";
import { createForm, textField } from "@fab4m/fab4m";
import {
  StatefulFormView,
  FormProvider,
  allWidgetsRenderer,
} from "@fab4m/react";
type Party = {
  foods: string[];
  allergies: string[];
};
const form = createForm<Party>({
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
  const [data, changeData] = useState<Party | null>(null);

  form.onSubmit((e, submittedData) => {
    e.preventDefault();
    changeData(submittedData);
  });

  return (
    <>
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
    </>
  );
}
