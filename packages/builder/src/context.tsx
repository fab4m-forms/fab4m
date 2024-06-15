import { SerializedComponent, SerializedForm } from "@fab4m/fab4m";
import { createContext, useContext } from "react";

export type FormBuilderActions = {
  removeComponent: (key: string) => void;
  updateComponent: (key: string, component: SerializedComponent) => void;
  changeForm: (form: SerializedForm) => void;
};

export const FormBuilderActionsContext =
  createContext<FormBuilderActions | null>(null);

export const FormBuilderFormContext = createContext<SerializedForm | null>(
  null,
);
export function useFormBuilderActions(): FormBuilderActions {
  const context = useContext(FormBuilderActionsContext);
  if (!context) {
    throw new Error(
      "You used the useFormBuilderActions() hook used outside of a <FormProvider />",
    );
  }
  return context;
}

export function useFormBuilderForm(): SerializedForm {
  const context = useContext(FormBuilderFormContext);
  if (!context) {
    throw new Error(
      "You used the useFormBuilderForm() hook used outside of a <FormProvider />",
    );
  }
  return context;
}
