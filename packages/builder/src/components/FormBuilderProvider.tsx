import React from "react";
import { SerializedComponent, SerializedForm } from "@fab4m/fab4m";
import { FormBuilderActionsContext, FormBuilderFormContext } from "../context";
import { removeComponent, updateComponent } from "../util";

export type FormBuilderProviderProps = {
  form: SerializedForm;
  formChanged: (form: SerializedForm) => void;
  children: React.ReactNode;
};

export function FormBuilderProvider(props: FormBuilderProviderProps) {
  const context = {
    removeComponent: (key: string) => {
      props.formChanged(removeComponent(props.form, key));
    },
    updateComponent: (key: string, component: SerializedComponent) => {
      props.formChanged(updateComponent(props.form, key, component));
    },
    changeForm: props.formChanged,
  };
  return (
    <FormBuilderActionsContext.Provider value={context}>
      <FormBuilderFormContext.Provider value={props.form}>
        {props.children}
      </FormBuilderFormContext.Provider>
    </FormBuilderActionsContext.Provider>
  );
}
