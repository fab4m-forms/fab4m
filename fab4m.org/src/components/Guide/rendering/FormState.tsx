import * as React from "react";
import { textField, createForm, FormView } from "fab4m";

const form = createForm({
  text: textField({ label: "Text field" }),
});

export default function FormViewExampleWithHook() {
  const [data, changeData] = React.useState({ text: "Some text" });
  form.onDataChange(changeData);
  return (
    <div>
      <FormView form={form} data={data} hideSubmit={true} />
      <p>{data.text}</p>
    </div>
  );
}
