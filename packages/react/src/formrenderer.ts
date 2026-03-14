import {
  MultipleWidgetProps,
  ValidatorInfoProps,
  WidgetProps,
} from "@fab4m/fab4m";
import { ComponentType, createContext, useContext } from "react";

export type FormRenderer = {
  widgetComponents: Record<string, ComponentType<WidgetProps<any, any>>>;
  multipleWidgetComponents?: Record<
    string,
    ComponentType<MultipleWidgetProps<any, any>>
  >;
  validatorComponents?: Record<
    string,
    ComponentType<ValidatorInfoProps<any, any>>
  >;
};

export const FormRendererContext = createContext<FormRenderer | null>(null);

export function createFormRenderer(args: FormRenderer): FormRenderer {
  return args;
}

export function useFormRendererContext(): FormRenderer {
  const context = useContext(FormRendererContext);
  if (!context) {
    throw new Error(
      "You used the useFormContext() hook used outside of a <FormProvider />",
    );
  }
  return context;
}
