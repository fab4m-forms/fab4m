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
  },
): React.JSX.Element {
  const [data, changeData] = React.useState(props.data ?? {});
  // We keep track of the current indices where our listeners are.
  const listenerIndices = React.useRef([-1, -1]);
  React.useEffect(() => {
    // The new indices will be at the end of the array.
    const newIndices = [
      props.form.afterSubmitListeners.length,
      props.form.dataChangeListeners.length,
    ];
    if (listenerIndices.current[0] !== -1) {
      props.form.afterSubmitListeners.splice(listenerIndices.current[0], 1);
    }
    props.form.onAfterSubmit(() => {
      changeData(props.data ?? {});
    }, true);
    if (listenerIndices.current[1] !== -1) {
      props.form.dataChangeListeners.splice(listenerIndices.current[1], 1);
    }
    props.form.onDataChange(changeData, true);
    listenerIndices.current = newIndices;
    // Remove the listeners when the component unmounts.
    return () => {
      props.form.afterSubmitListeners.splice(listenerIndices.current[0], 1);
      props.form.dataChangeListeners.splice(listenerIndices.current[1], 1);
    };
  });
  return <FormView {...props} data={data} />;
}
