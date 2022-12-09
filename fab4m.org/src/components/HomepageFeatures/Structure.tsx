import React, { useState } from "react";
import Arrow from "./Arrow";
import { definitions } from "./form";
import CodeBlock from "@theme/CodeBlock";
import {
  createForm,
  textField,
  StatefulFormView,
  selectWidget,
  useForm,
  Form,
} from "fab4m";
import "fab4m/css/basic/basic.css";

function componentTemplate(component: string) {
  return definitions.get(component).code;
}

export default function Structure(props: {
  form: Form;
  components: string[];
  changeComponents: (components: string[]) => void;
}) {
  const addForm = useForm(() =>
    createForm(
      {
        name: textField({
          label: "Add component",
          description: "Add components to this form.",
          required: true,
          widget: selectWidget(
            [...definitions.entries()]
              .map(([name, component]) => {
                return [component.component.label ?? "", name];
              })
              .filter((option) => props.components.indexOf(option[1]) === -1)
          ),
        }),
      },
      { labels: { submit: "Add component" } }
    )
  );

  const form = useForm(() => {
    const form = createForm({
      name: textField({
        label: "Name",
        description: "Enter your full name",
        required: true,
      }),
      location: textField({
        label: "Location",
      }),
    });
    for (const name of props.components) {
      const component = definitions.get(name);
      if (component) {
        form.add({ name: name, ...component.component });
      }
    }
    return form;
  }, [...props.components]);
  addForm.onSubmit((e, data) => {
    e.preventDefault();
    props.changeComponents([...props.components, data.name]);
  });
  return (
    <div className="container">
      <div className="features">
        <div className="feature">
          <div className="feature-box">
            <h3>Add a component</h3>

            <p>
              Add a component from the list, and see the fab4m structure in
              action.
            </p>
            <StatefulFormView form={addForm} />
          </div>
        </div>
        <Arrow />
        <div className="feature">
          <div className="feature-box">
            <h3>Code</h3>
            <p>This is the code for the form:</p>
            {
              <CodeBlock language="jsx">
                {`const form = createForm({
  name: textField({
    label: "Name",
    description: "Enter your full name",
    required: true,
  }),
  location: textField({
    label: "Location",
  }),
  ${props.components.map(componentTemplate)}
});`}
              </CodeBlock>
            }
          </div>
        </div>
        <Arrow />
        <div className="feature">
          <div className="feature-box">
            <h3>The result</h3>
            <p>The form structure get's rendered into your form!</p>
            {
              <CodeBlock language="jsx">{`<StatefulFormView
  form={form}
  hideSubmit={true}
/>`}</CodeBlock>
            }
            <StatefulFormView form={form} hideSubmit={true} />
          </div>
        </div>
      </div>
    </div>
  );
}
