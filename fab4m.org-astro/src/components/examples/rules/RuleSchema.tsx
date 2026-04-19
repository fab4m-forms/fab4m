import * as React from "react";
import {
  textField,
  equals,
  generateSchema,
  createForm,
  booleanField,
} from "@fab4m/fab4m";
import {
  StatefulFormView,
  FormProvider,
  allWidgetsRenderer,
} from "@fab4m/react";

const form = createForm({
  city: textField({ label: "City" }),
  streetCars: booleanField({
    label: "Do you use street cars?",
    required: true,
    rules: [["city", equals("Gothenburg")]],
  }),
});

export default function RuleSchema() {
  const [schema, changeSchema] = React.useState(generateSchema(form));
  form.onDataChange((data) => {
    changeSchema(generateSchema(form, data));
  });
  return (
    <div>
      <FormProvider renderer={allWidgetsRenderer}>
        <StatefulFormView form={form} hideSubmit={true} />
      </FormProvider>
      <h4>Here's the schema:</h4>
      <pre>{JSON.stringify(schema, null, 2)}</pre>
    </div>
  );
}
