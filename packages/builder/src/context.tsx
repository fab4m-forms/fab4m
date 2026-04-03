import { SerializedComponent, SerializedForm } from "@fab4m/fab4m";
import { ReactNode, createContext, useContext } from "react";
import { Plugins } from ".";

export type FormBuilderActions = {
  removeComponent: (key: string) => void;
  updateComponent: (key: string, component: SerializedComponent) => void;
  changeForm: (form: SerializedForm) => void;
};

export type FormBuilderFormContextData = {
  form: SerializedForm;
  plugins: Plugins;
  icons?: Record<string, ReactNode>;
};

export const FormBuilderActionsContext =
  createContext<FormBuilderActions | null>(null);

export const FormBuilderFormContext =
  createContext<FormBuilderFormContextData | null>(null);

export function useFormBuilderActions(): FormBuilderActions {
  const context = useContext(FormBuilderActionsContext);
  if (!context) {
    throw new Error(
      "You used the useFormBuilderActions() hook outside of a <FormBuilderProvider />",
    );
  }
  return context;
}

export function useFormBuilder(): FormBuilderFormContextData {
  const context = useContext(FormBuilderFormContext);
  if (!context) {
    throw new Error(
      "You used the useFormBuilderForm() hook outside of a <FormBuilderProvider />",
    );
  }
  return context;
}

export function useFormBuilderForm(): SerializedForm {
  return useFormBuilder().form;
}
