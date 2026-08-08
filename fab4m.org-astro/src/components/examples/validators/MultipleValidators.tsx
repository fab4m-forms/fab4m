import React, { useState } from "react";
import { createForm, textField, minLength, allowedValues } from "@fab4m/fab4m";
import {
  StatefulFormView,
  FormProvider,
  allWidgetsRenderer,
} from "@fab4m/react";

const form = createForm({
  longtext: textField({
    label:
      "Long text (at least 5 characters, valid Values: Water, Juice, Soda)",
    validators: [minLength(5), allowedValues(["Water", "Juice", "Soda"])],
  }),
});

export default function MinLengthExample() {
  const [drink, changeDrink] = useState<string | undefined>(undefined);
  form.onSubmit((e, data) => {
    e.preventDefault();
    changeDrink(data.longtext);
  });
  return (
    <div>
      <FormProvider renderer={allWidgetsRenderer}>
        <StatefulFormView form={form} />
      </FormProvider>
      {drink && (
        <div>
          <strong>Your drink:</strong> {drink}
        </div>
      )}
    </div>
  );
}
