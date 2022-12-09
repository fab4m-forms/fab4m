import * as React from "react";
import { FormViewProps } from "src/formview";
import FormView from "./FormView";

/**
 * Use this component to render a form which manages the form state internally,
 * @group React API
 */
export default function StatefulFormView(
  props: Omit<FormViewProps, "data"> & {
    data?: unknown;
  }
): JSX.Element {
  const [data, changeData] = React.useState(props.data ?? {});
  props.form.onAfterSubmit(() => {
    changeData(props.data ?? {});
  });
  props.form.onDataChange(changeData);
  return <FormView {...props} data={data} />;
}
