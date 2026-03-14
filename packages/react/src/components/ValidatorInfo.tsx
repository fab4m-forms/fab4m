import * as React from "react";
import { FormComponent, Theme } from "@fab4m/fab4m";
import { useFormRendererContext } from "../formrenderer";
/**
 * Render Validatior information for a specific component.
 * @group React widget API.
 */
export function ValidatorInfo(props: {
  value: unknown;
  component: FormComponent;
  theme: Theme;
}): React.JSX.Element | null {
  const { validatorComponents } = useFormRendererContext();
  if (!validatorComponents) {
    return null;
  }
  const info = [];
  for (const v of props.component.validators) {
    if (validatorComponents[v.type.name]) {
      const Validator = validatorComponents[v.type.name];
      info.push(
        <Validator
          key={info.length}
          theme={props.theme}
          value={props.value}
          settings={v.settings}
        />,
      );
    }
  }
  return info.length > 0 ? <div>{info}</div> : null;
}
