import * as React from "react";
import {
  createFormRenderer,
  FormRendererContext,
  FormRenderer,
} from "../formrenderer";

export type FormProviderProps = {
  renderer: FormRenderer;
  children: React.ReactNode;
};

export function FormProvider(props: FormProviderProps) {
  const renderer = createFormRenderer(props.renderer);
  return (
    <FormRendererContext.Provider value={renderer}>
      {props.children}
    </FormRendererContext.Provider>
  );
}
