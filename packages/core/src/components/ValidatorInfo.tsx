import * as React from "react";
import { FormComponent } from "../component";
import { Theme } from "../theme";
/**
 * Render Validatior information for a specific component.
 * @group React widget API.
 */
export default function ValidatorInfo(props: {
  value: unknown;
  component: FormComponent;
  theme: Theme;
}): JSX.Element | null {
  const info = props.component.validators
    .filter((v) => v.type.validatorInfo)
    .map((v, i) =>
      v.type.validatorInfo ? (
        <v.type.validatorInfo
          key={i}
          theme={props.theme}
          value={props.value}
          settings={v.settings}
        />
      ) : null,
    );
  return info.length > 0 ? <div>{info}</div> : null;
}
