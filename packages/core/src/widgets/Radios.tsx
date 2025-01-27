import * as React from "react";
import FormComponentWrapper from "../components/FormComponentWrapper";
import { WidgetProps } from "../widget";
import { Option, optionValue } from "./options";
/**
 * The Radios widget renders a series of radio input widget for each option.
 * @group React widgets
 */
function Radios<OptionsType extends string | number | React.ReactElement>(
  props: WidgetProps<OptionsType, Option<OptionsType>[]>,
) {
  const classes = props.theme.classes;
  const options = props.settings.map((option, index) => {
    const id = `${props.id}-${index}`;
    const value = optionValue(option);
    let elementValue: string | number | undefined;
    if (typeof value === "string" || typeof value === "number") {
      elementValue = value;
    }
    return (
      <label className={classes.radioWrapper} htmlFor={id} key={index}>
        <>
          <input
            type="radio"
            id={id}
            name={props.name}
            value={elementValue}
            onChange={() => props.onChange(value)}
            checked={props.value === value}
          />{" "}
          {Array.isArray(option) ? option[0] : option}
        </>
      </label>
    );
  });
  return (
    <FormComponentWrapper {...props}>
      <div className={classes.radiosWrapper}>{options}</div>
    </FormComponentWrapper>
  );
}

export default Radios as React.FC;
