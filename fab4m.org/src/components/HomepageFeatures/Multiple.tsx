import React, { useState } from "react";
import Link from "@docusaurus/Link";
import CodeBlock from "@theme/CodeBlock";
import {
  textField,
  integerField,
  selectWidget,
  useForm,
  createForm,
  defaultMultipleWidget,
  tagsWidget,
  min,
  FormView,
  StatefulFormView,
} from "@fab4m/fab4m";

interface MultipleOptions {
  widget: string;
  minItems: number;
  maxItems: number;
}

const template = (multipleOptions: MultipleOptions) => `
foods: textField({
  title: "Favorite foods",
  multiple: true, ${
    multipleOptions.widget === "tags" ? "\n  widget: tagsWidget()" : ""
  },
  minItems: ${multipleOptions.minItems},
  maxItems: ${multipleOptions.maxItems},
});
`;
export default function Multiple() {
  const [multipleOptions, changeMultipleOptions] = useState<MultipleOptions>({
    widget: "default",
    minItems: 0,
    maxItems: 0,
  });
  const widget =
    multipleOptions.widget === "default"
      ? defaultMultipleWidget()
      : tagsWidget<string>();

  const foods = textField({
    label: "Foods",
    multipleWidget: widget,
    minItems: multipleOptions.minItems,
    maxItems: multipleOptions.maxItems,
    multiple: true,
  });

  const multipleForm = useForm(() =>
    createForm({
      widget: textField({
        label: "Change the multiple widget:",
        widget: selectWidget([
          ["Default", "default"],
          ["Tags", "tags"],
        ]),
        required: true,
      }),
      minItems: integerField({
        label: "Min number of items",
        required: true,
        validators: [min(0)],
      }),
      maxItems: integerField({
        label: "Max number of items",
        required: true,
        validators: [min(0)],
      }),
    })
  ).onDataChange(changeMultipleOptions);
  const form = useForm(() =>
    createForm({
      foods,
    })
  );
  return (
    <div className="feature-large">
      <div className="description">
        <h3>Manage multiple values easily</h3>
        <p>Collect multiple values for any component.</p>
        <Link
          className="button button--primary"
          to="/docs/guide/docs/guide/widgets#widgets-for-multiple-components"
        >
          Read more about multiple values
        </Link>
      </div>
      <div className="example">
        <FormView
          form={multipleForm}
          data={multipleOptions}
          hideSubmit={true}
        />
        <CodeBlock language="jsx">{template(multipleOptions)}</CodeBlock>
        <div className="feature-box">
          <StatefulFormView form={form} hideSubmit={true} />
        </div>
      </div>
    </div>
  );
}
