import React from "react";
import { createForm, textField, hiddenFieldWidget } from "@fab4m/fab4m";
import "@fab4m/fab4m/css/basic/basic.css";
import {
  StatefulFormView,
  content,
  FormProvider,
  allWidgetsRenderer,
} from "@fab4m/react";

const form = createForm({
  content: content({}, () => <p>There's a hidden field down here:</p>),
  hidden: textField({
    widget: hiddenFieldWidget(),
  }),
});

export default function hiddenFieldExample() {
  return (
    <FormProvider renderer={allWidgetsRenderer}>
      <StatefulFormView
        form={form}
        hideSubmit={true}
        // The value of the field is provided through the data.
        data={{ hidden: "value" }}
      />
    </FormProvider>
  );
}
