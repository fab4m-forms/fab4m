import { SerializedComponent, SerializedForm } from "@fab4m/fab4m";
import { ReactNode, createContext, useContext } from "react";
import { Plugins } from ".";

export type FormBuilderActions = {
  removeComponent: (key: string) => void;
  updateComponent: (key: string, component: SerializedComponent) => void;
  changeForm: (form: SerializedForm) => void;
};

export type FormBuilderFormContext = {
  form: SerializedForm;
  plugins: Plugins;
  icons?: Record<string, ReactNode>;
};

export const FormBuilderActionsContext =
  createContext<FormBuilderActions | null>(null);

export const FormBuilderFormContext =
  createContext<FormBuilderFormContext | null>(null);
export function useFormBuilderActions(): FormBuilderActions {
  const context = useContext(FormBuilderActionsContext);
  if (!context) {
    throw new Error(
      "You used the useFormBuilderActions() hook used outside of a <FormProvider />",
    );
  }
  return context;
}

export function useFormBuilder(): FormBuilderFormContext {
  const context = useContext(FormBuilderFormContext);
  if (!context) {
    throw new Error(
      "You used the useFormBuilderForm() hook used outside of a <FormProvider />",
    );
  }
  return context;
}

export function useFormBuilderForm(): SerializedForm {
  return useFormBuilder().form;
}
