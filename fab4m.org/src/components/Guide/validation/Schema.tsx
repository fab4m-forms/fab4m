import React from "react";
import CodeBlock from "@theme/CodeBlock";
import * as beautify from "json-beautify";

import {
  createForm,
  textField,
  integerField,
  minLength,
  allowedValues,
  generateSchema,
  booleanField,
  group,
} from "@fab4m/fab4m";

const form = createForm({
  username: textField({ required: true, validators: [minLength(5)] }),
  age: integerField({ label: "Username" }),
  city: textField({
    required: true,
    validators: [allowedValues(["Gothenburg", "Stockholm"])],
  }),
  vegetarian: booleanField({ label: "Vegetarian" }),
  interests: textField({ label: "Interests", multiple: true, minItems: 2 }),
  profession: group(
    { label: "Profession" },
    {
      workplace: textField({ label: "Workplace" }),
      label: textField({ label: "Title" }),
    }
  ),
});

const schema = generateSchema(form);
export default () => {
  return (
    <div style={{ maxHeight: "300px", overflowY: "scroll" }}>
      <CodeBlock language="json">
        {beautify.default(schema, null, 2, 80)}
      </CodeBlock>
    </div>
  );
};
