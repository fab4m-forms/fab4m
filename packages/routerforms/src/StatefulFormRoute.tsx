import * as React from "react";
import FormRoute, { FormRouteProps } from "./FormRoute";

/**
 * Use this component to render a form which manages the form state internally,
 * @group React API
 */
export default function StatefulFormRoute(
  props: Omit<FormRouteProps, "data"> & {
    data?: unknown;
  },
): JSX.Element {
  const [data, changeData] = React.useState(props.data ?? {});
  props.form.onAfterSubmit(() => {
    changeData(props.data ?? {});
  });
  props.form.onDataChange(changeData);
  return <FormRoute {...props} data={data} />;
}
