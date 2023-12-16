import * as React from "react";
import * as beautify from "json-beautify";
import {
  textField,
  equals,
  createForm,
  StatefulFormView,
  selectWidget,
  group,
  generateSchema,
} from "@fab4m/fab4m";
import { Schema } from "ajv";

const form = createForm({
  transport: textField({
    label: "How do you get to work?",
    required: true,
    widget: selectWidget(["Car", "Public transport"]),
  }),

  questions: [
    [
      "transport",
      equals("Car"),
      group(
        { label: "Questions" },
        {
          car: textField({
            label: "What type of car do you have?",
            required: true,
          }),
        },
      ),
    ],
    [
      "transport",
      equals("Public transport"),
      group(
        { label: "Questions" },
        {
          publicTransport: textField({
            label: "What type of public transport do you use?",
            required: true,
          }),
        },
      ),
    ],
  ],
});

export default function VariantSchema() {
  const [schema, changeSchema] = React.useState<string | Schema>(
    generateSchema(form),
  );
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
