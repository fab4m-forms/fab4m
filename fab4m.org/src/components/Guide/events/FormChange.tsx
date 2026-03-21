import {
  createForm,
  textField,
  integerField,
  textAreaWidget,
} from "@fab4m/fab4m";
import React, { useState } from "react";
import { FormView, FormProvider, allWidgetsRenderer } from "@fab4m/react";

const form = createForm({
  name: textField({ label: "Name" }),
  bio: textField({ label: "Bio", widget: textAreaWidget() }),
  age: integerField({ label: "Age" }),
});

export function OnChangeExample() {
  // We set up a state within this component with some defaults.
  const [data, changeData] = useState({
    name: "Fabian Sörqvist",
    bio: "This is my bio",
    age: 33,
  });
  // When our data changes, we update our state, so that we have the
  // current fresh form data available.
  form.onDataChange((newData) => {
    // This could be written just as form.onDataChange(changeData)
    changeData(newData);
  });
  // We render our form using the FormView component, and render the
  // information that is changed by the form on the fly.
  return (
    <>
      <FormProvider renderer={allWidgetsRenderer}>
        <FormView form={form} data={data} hideSubmit={true} />
      </FormProvider>
      <div>
        <dl>
          <dt>Name</dt>
          <dd>{data.name}</dd>
          <dt>Bio</dt>
          <dd>{data.bio}</dd>
          <dt>Age</dt>
          <dd>{data.age}</dd>
        </dl>
      </div>
    </>
  );
}
