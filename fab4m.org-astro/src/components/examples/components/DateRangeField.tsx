import * as React from "react";
import { createForm, dateRangeField, type DateRange } from "@fab4m/fab4m";
import {
  StatefulFormView,
  FormProvider,
  allWidgetsRenderer,
} from "@fab4m/react";

const form = createForm({
  vacation: dateRangeField({
    label: "Enter your desired vacation",
  }),
});

export default function DateRangeField() {
  const [result, changeResult] = React.useState<{ vacation: DateRange } | null>(
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
        <p>
          Your vacation is {result.vacation?.from.toLocaleDateString()} -{" "}
          {result.vacation?.to?.toLocaleDateString()}
        </p>
      )}
    </div>
  );
}
