import type {
  MultipleWidgetProps,
  ValidatorInfoProps,
  WidgetProps,
} from "@fab4m/fab4m";
import { createContext, type Component } from "svelte";
export type EMPTY_COMPONENT = "EMPTY_COMPONENT";
export type FormRenderer = {
  widgetComponents: Record<string, Component<WidgetProps<any, any>> | EMPTY_COMPONENT>;
  multipleWidgetComponents?: Record<
    string,
    Component<MultipleWidgetProps<any, any>>
  >;
  validatorComponents?: Record<string, Component<ValidatorInfoProps<any, any>>>;
};

export const [getFormRendererContext, setFormRendererContext] =
  createContext<FormRenderer>();

export function createFormRenderer(args: FormRenderer): FormRenderer {
  return args;
}
