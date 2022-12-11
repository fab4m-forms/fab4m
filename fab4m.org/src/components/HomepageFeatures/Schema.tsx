import React, { useState } from "react";
import Link from "@docusaurus/Link";
import CodeBlock from "@theme/CodeBlock";
import * as beautify from "json-beautify";
import {
  useForm,
  createForm,
  emailField,
  min,
  integerField,
  generateSchema,
} from "@fab4m/fab4m";

const template = `email: emailField({
  label: "Your email",
  required: true,
}),
age: integerField({
  label: "Age",
  required: true,
  validators: [min(18)],
})`;

export default function Schema() {
  const form = useForm(() =>
    createForm({
      email: emailField({
        label: "Your email",
        required: true,
      }),
      age: integerField({
        label: "Age",
        required: true,
        validators: [min(18)],
      }),
    })
  );

  return (
    <div className="feature-large">
      <div className="description">
        <h3>JSON Schema validation</h3>
        <p>
          A JSON Schema can be generated for all fab4m forms. This makes it easy
          to validate your data anywhere outside of the browser.
        </p>
        <Link className="button button--primary" to="/docs/guide/validation">
          Read more about JSON Schema
        </Link>
      </div>
      <div className="example">
        <p>The following components:</p>
        <CodeBlock language="jsx">{template}</CodeBlock>
        <p>Generates the following schema:</p>
        <CodeBlock language="json">
          {beautify.default(generateSchema(form), null, 2, 80)}
        </CodeBlock>
      </div>
    </div>
  );
}
