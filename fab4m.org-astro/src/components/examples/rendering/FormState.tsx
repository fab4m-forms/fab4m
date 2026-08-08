import * as React from "react";
import { textField, createForm } from "@fab4m/fab4m";
import { FormView, FormProvider, allWidgetsRenderer } from "@fab4m/react";

const form = createForm({
  text: textField({ label: "Text field" }),
});

export default function FormViewExampleWithHook() {
  const [data, changeData] = React.useState({ text: "Some text" });
  form.onDataChange((newData) =>
    changeData((prev) => ({ ...prev, ...newData })),
  );
  return (
    <div>
      <FormProvider renderer={allWidgetsRenderer}>
        <FormView form={form} data={data} hideSubmit={true} />
      </FormProvider>
      <p>{data.text}</p>
    </div>
  );
}
