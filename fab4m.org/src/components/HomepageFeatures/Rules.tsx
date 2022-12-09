import React, { useState } from "react";
import Link from "@docusaurus/Link";
import CodeBlock from "@theme/CodeBlock";
import {
  useForm,
  createForm,
  StatefulFormView,
  emailField,
  exists,
  booleanField,
} from "fab4m";

const template = `newsletter: booleanField({
    label: "Sign up for our newsletter",
  }),
  email: emailField({
    label: "Your email",
    rules: [exists("newsletter")],
  })`;

export default function Rules() {
  const form = useForm(() =>
    createForm({
      newsletter: booleanField({
        label: "Sign up for our newsletter",
      }),
      email: emailField({
        label: "Your email",
        rules: [["newsletter", exists()]],
      }),
    })
  );

  return (
    <div className="feature-large">
      <div className="description">
        <h3>Visibility rules</h3>
        <p>
          Use visibility rules to decide which components to include in the
          form.
        </p>
        <Link className="button button--primary" to="/docs/guide/rules">
          Read more about rules
        </Link>
      </div>
      <div className="example">
        <CodeBlock language="jsx">{template}</CodeBlock>
        <div className="feature-box">
          <StatefulFormView form={form} hideSubmit={true} />
        </div>
      </div>
    </div>
  );
}
