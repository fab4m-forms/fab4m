import React, { useState } from "react";
import { createForm, textField, minLength } from "@fab4m/fab4m";
import {
  StatefulFormView,
  FormProvider,
  allWidgetsRenderer,
} from "@fab4m/react";

const form = createForm({
  longtext: textField({
    label: "Long text (at least 10 characters)",
    validators: [minLength(10)],
  }),
});

export default function MinLengthExample() {
  const [longText, changeLongText] = useState(undefined);
  form.onSubmit((e, data) => {
    e.preventDefault();
    changeLongText(data.longtext);
  });
  return (
    <div>
      <FormProvider renderer={allWidgetsRenderer}>
        <StatefulFormView form={form} />
      </FormProvider>
      {longText && (
        <div>
          <strong>Your long text:</strong> {longText}
        </div>
      )}
    </div>
  );
}
