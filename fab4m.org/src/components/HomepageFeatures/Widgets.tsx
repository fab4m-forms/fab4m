import React, { useState } from "react";
import Link from "@docusaurus/Link";
import CodeBlock from "@theme/CodeBlock";
import {
  textField,
  textFieldWidget,
  selectWidget,
  radiosWidget,
  useForm,
  FormView,
  createForm,
  StatefulFormView,
} from "fab4m";
const locationOptions = ["Gothenburg", "Stockholm"];
const widgetTemplates = {
  select: `selectWidget(["Gothenburg", "Stockholm"])`,
  radios: `radiosWidget(["Gothenburg", "Stockholm"])`,
  text: `textFieldWidget()`,
};

export default function Widgets() {
  const [widget, changeWidget] = useState("select");
  const locationField = textField({ label: "Location" });

  if (widget === "select") {
    locationField.widget = selectWidget(locationOptions);
  } else if (widget === "radios") {
    locationField.widget = radiosWidget(locationOptions);
  } else {
    locationField.widget = textFieldWidget();
  }

  const widgetSelectForm = useForm(() =>
    createForm({
      widget: textField({
        label: "Change the widget to preview it in the form:",
        widget: radiosWidget([
          ["Select", "select"],
          ["Radios", "radios"],
          ["Text", "text"],
        ]),
      }),
    })
  ).onDataChange((data) => {
    changeWidget(data.widget);
  });
  const form = useForm(() =>
    createForm({
      location: locationField,
    })
  );
  return (
    <div className="feature-large">
      <div className="description">
        <h3>Customize your form with widgets</h3>
        <p>
          Use different widgets to customize the form input. We provide the most
          common ones and you can create your own ones too!
        </p>
        <Link className="button button--primary" to="/docs/guide/widgets">
          Read more about widgets
        </Link>
      </div>
      <div className="example">
        <FormView form={widgetSelectForm} data={{ widget }} hideSubmit={true} />
        <CodeBlock language="jsx">
          {`location: textField({
  title: "Change the widget to preview it in the form:",
  widget: ${widgetTemplates[widget]} // <-- The widget changes here!
}),`}
        </CodeBlock>
        <div className="feature-box">
          <StatefulFormView form={form} hideSubmit={true} />
        </div>
      </div>
    </div>
  );
}
