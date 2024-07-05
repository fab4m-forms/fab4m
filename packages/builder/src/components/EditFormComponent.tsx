import React from "react";
import { useFormBuilder, useFormBuilderActions } from "../context";
import { findComponentFromKey, findPlugin } from "../util";
import { ComponentForm } from "./ComponentForm";

type EditFormComponentProps = {
  componentKey: string;
  componentSaved: () => void;
};

export function EditFormComponent(props: EditFormComponentProps) {
  const { plugins, form } = useFormBuilder();
  const { updateComponent } = useFormBuilderActions();
  const component = findComponentFromKey(form.components, props.componentKey);
  const type = findPlugin(component.type, plugins.types);
  return (
    <ComponentForm
      component={component}
      type={type}
      componentChanged={(component) => {
        updateComponent(props.componentKey, component);
        props.componentSaved();
      }}
    />
  );
}
