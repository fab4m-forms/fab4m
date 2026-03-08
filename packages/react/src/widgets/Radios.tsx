import * as React from "react";
import { Option, optionValue, WidgetProps } from "@fab4m/fab4m";
import { FormComponentWrapper } from "../components/FormComponentWrapper";

/**
 * The Radios widget renders a series of radio input widget for each option.
 * @group React widgets
 */
export default function Radios<
  OptionsType extends string | number | React.ReactElement,
>(
  props: WidgetProps<OptionsType, Option<OptionsType>[]>,
): React.JSX.Element {
  const classes = props.theme.classes;
  const options = props.settings.map((option: Option<OptionsType>, index) => {
    const id = `${props.id}-${index}`;
    const value = optionValue(option) as OptionsType;
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
