import React, { useState } from "react";
import Link from "@docusaurus/Link";
import CodeBlock from "@theme/CodeBlock";
import {
  textField,
  integerField,
  textAreaWidget,
  minLength,
  createForm,
} from "@fab4m/fab4m";
import {
  useForm,
  FormView,
  StatefulFormView,
  FormProvider,
  allWidgetsRenderer,
} from "@fab4m/react";

const validatorTemplate = (length: number) => `
text: textField({
  label: "Long text",
  widget: textAreaWidget(),
  description: \`Enter a text that is at least ${length} characters long\`,
  validators: [minLength(${length})],
});
`;

export default function Validators() {
  const [length, changeLength] = useState(10);
  const field = textField({
    label: "Long text",
    widget: textAreaWidget(),
    description: `Enter a text that is at least ${length} characters long`,
    validators: [minLength(length)],
  });

  const widgetSelectForm = useForm(() =>
    createForm({
      length: integerField({
        label: "Change the required length in the form:",
        required: true,
      }),
    }),
  ).onDataChange((data) => {
    changeLength(data.length);
  });
  const form = useForm(() =>
    createForm({
      text: field,
    }),
  );
  return (
    <div className="feature-large">
      <div className="description">
        <h3>Validators</h3>
        <p>
          Add declarative validators to your form to make sure the data is
          valid.
        </p>
        <Link className="button button--primary" to="/docs/guide/validators">
          Read more about validators
        </Link>
      </div>
      <div className="example">
        <FormProvider renderer={allWidgetsRenderer}>
          <FormView
            form={widgetSelectForm}
            data={{ length }}
            hideSubmit={true}
          />
        </FormProvider>
        <CodeBlock language="jsx">{validatorTemplate(length)}</CodeBlock>
        <div className="feature-box">
          <FormProvider renderer={allWidgetsRenderer}>
            <StatefulFormView form={form} hideSubmit={true} />
          </FormProvider>
        </div>
      </div>
    </div>
  );
}
