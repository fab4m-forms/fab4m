import * as React from "react";
import { createForm, textField, pageBreak } from "fab4m";
import { StatefulFormRoute } from "../../src";

const form = createForm({
  text: textField({ label: "First field", required: true }),
  pagebreak: pageBreak(),
  nextText: textField({ label: "Second field" }),
});

export default function StatefulRouterExample() {
  return <StatefulFormRoute basePath="/stateful-example" form={form} />;
}
