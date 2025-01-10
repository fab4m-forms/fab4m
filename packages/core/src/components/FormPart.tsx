import React from "react";
import { FormComponentWithName } from "../component";
import { componentErrors, Form } from "../form";
import { filterComponents, filterData } from "../rule";
import { ValidationError } from "../validator";
import FormComponentView from "./FormComponentView";
/**
 * Render a specific form part.
 * This component is mostly used internally, but it's useful if you need to create a custom
 * Form view component.
 * @group React form rendering internals
 */
export default function FormPart(props: {
  /** The form to render */
  form: Form;
  /** The whole part will be rendered with `display: none` if this is set to true*/
  hide: boolean;
  /** A prefix to use for all ids */
  idPrefix?: string;
  /** A list of validation errors to pass to the components. */
  errors: ValidationError[];
  /** The current data in the form. */
  data: Record<string, unknown>;
  /** Set to true to optimize for server side rendering.*/
  ssr: boolean;
  /** A list of components within the form part to render*/
  components: FormComponentWithName[];
}): React.JSX.Element {
  const changeComponent = (name: string, value: unknown) => {
    const newData = { ...props.data, [name]: value };
    const filteredData = filterData(props.components, newData);
    props.form.triggerChangeComponent(name, value);
    props.form.triggerChangeData(filteredData);
  };
  return (
    <div
      className={props.form.theme.classes.formPart}
      style={{ display: props.hide ? "none" : "block" }}
    >
      {filterComponents(props.components, props.data).map(
        (component, index) =>
          component.name && (
            <FormComponentView
              value={props.data[component.name]}
              ssr={props.ssr}
              errors={componentErrors(`/${component.name}`, props.errors)}
              component={component}
              id={props.idPrefix ? props.idPrefix + component.name : undefined}
              name={component.name}
              theme={props.form.theme}
              key={index}
              onChange={(value) =>
                component.name && changeComponent(component.name, value)
              }
            />
          ),
      )}
    </div>
  );
}
