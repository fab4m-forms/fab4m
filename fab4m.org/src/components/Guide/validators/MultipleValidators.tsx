import React, { useState } from "react";
import {
  createForm,
  textField,
  minLength,
  allowedValues,
  StatefulFormView,
} from "fab4m";

const form = createForm({
  longtext: textField({
    label:
      "Long text (at least 5 characters, valid Values: Water, Juice, Soda)",
    validators: [minLength(5), allowedValues(["Water", "Juice", "Soda"])],
  }),
});

export default function MinLengthExample() {
  const [drink, changeDrink] = useState(undefined);
  form.onSubmit((e, data) => {
    e.preventDefault();
    changeDrink(data.longtext);
  });
  return (
    <div>
      <StatefulFormView form={form} />
      {drink && (
        <div>
          <strong>Your drink:</strong> {drink}
        </div>
      )}
    </div>
  );
}
