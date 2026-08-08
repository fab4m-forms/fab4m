import * as React from "react";
import { createForm, dateField } from "@fab4m/fab4m";
import {
  StatefulFormView,
  FormProvider,
  allWidgetsRenderer,
} from "@fab4m/react";

const form = createForm({
  birthday: dateField({
    label: "Your birthday",
  }),
});

export default function DateField() {
  const [result, changeResult] = React.useState<{ birthday: Date } | null>(
    null,
  );
  form.onSubmit((e, data) => {
    e.preventDefault();
    changeResult(data);
  });
  return (
    <div>
      <FormProvider renderer={allWidgetsRenderer}>
        <StatefulFormView form={form} />
      </FormProvider>
      {result && (
        <p>Your birthday is {result.birthday?.toLocaleDateString()}</p>
      )}
    </div>
  );
}
