import * as React from "react";
import { createForm, textField, pageBreak } from "@fab4m/fab4m";
import { FormRoute } from "../../src";

const form = createForm({
  text: textField({ label: "First field", required: true }),
  pagebreak: pageBreak(),
  nextText: textField({ label: "Second field" }),
});

export default function RouterExample() {
  const [data, setData] = React.useState({});
  const [submitted, setSubmitted] = React.useState(false);
  form.onDataChange(setData).onSubmit((e) => {
    e.preventDefault();
    setSubmitted(true);
  });
  return (
    <div>
      {submitted && <p>Thanks for your response!</p>}
      <FormRoute basePath="/basic-example" form={form} data={data} />
    </div>
  );
}
