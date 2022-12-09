import { useState } from "react";
import "./App.css";
import { textField, pageBreak, createForm } from "fab4m";
import { RouterFormView } from "../../src";
import "../../../core/css/basic/basic.css";

const form = createForm({
  text: textField({ label: "First field", required: true }),
  pagebreak: pageBreak(),
  nextText: textField({ label: "Second field" }),
});

export function Basic() {
  const [data, setData] = useState({});
  const [submitted, setSubmitted] = useState(false);
  form.onDataChange(setData).onSubmit((e) => {
    e.preventDefault();
    setSubmitted(true);
  });
  return (
    <div>
      <h2>Router form</h2>
      {submitted ? (
        <p>Thanks for your response!</p>
      ) : (
        <RouterFormView form={form} data={data} />
      )}
    </div>
  );
}
