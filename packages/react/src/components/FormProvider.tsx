import * as React from "react";
import {
  createFormRenderer,
  FormRendererContext,
  FormRenderer,
  ResolvedFormContextSettings,
} from "../formrenderer";

export type FormProviderProps = {
  renderer: FormRenderer | ResolvedFormContextSettings;
  children: React.ReactNode;
};

export function FormProvider(props: FormProviderProps) {
  const renderer = createFormRenderer(props.renderer);
  return <FormRendererContext.Provider value={renderer}>{props.children}</FormRendererContext.Provider>;
}
