import * as React from "react";
import * as beautify from "json-beautify";
import {
  textField,
  equals,
  StatefulFormView,
  generateSchema,
  createForm,
  booleanField,
} from "@fab4m/fab4m";

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
      <StatefulFormView form={form} hideSubmit={true} />
      <h4>Here's the schema:</h4>
      <pre>{beautify.default(schema, null, 2, 80)}</pre>
    </div>
  );
}
