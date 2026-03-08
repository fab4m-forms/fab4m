import * as React from "react";
import {
  Option,
  OptionGroup,
  SelectWidgetSettings,
  isOptionGroup,
  optionValue,
  WidgetProps,
} from "@fab4m/fab4m";
import { FormComponentWrapper } from "../components/FormComponentWrapper";

type OptionValue = string | number;

function renderOption<OptionsType extends OptionValue>(
  option: Option<OptionsType> | OptionGroup<OptionsType>,
  index: number,
): React.JSX.Element {
  return isOptionGroup(option) ? (
    <optgroup key={index} label={option[0]}>
      {option[1].map((childOption, childIndex) =>
        renderOption(childOption, childIndex),
      )}
    </optgroup>
  ) : (
    <option key={index} value={optionValue(option)}>
      {Array.isArray(option) ? option[0] : option}
    </option>
  );
}
/**
 * Renders a select html element with the options provided.
 * @group React widgets
 */
export function Select<OptionsType extends OptionValue>(
  props: WidgetProps<OptionsType, SelectWidgetSettings<OptionsType>>,
): React.JSX.Element {
  const classes = props.theme.classes;
  const options = props.settings.options.map((option, index) =>
    renderOption(option, index),
  );
  const change = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let value: OptionsType;
    switch (props.component.type.dataType) {
      case "integer":
        value = parseInt(e.target.value, 10) as OptionsType;
        break;
      case "float":
        value = parseFloat(e.target.value) as OptionsType;
        break;
      default:
        value = e.target.value as OptionsType;
    }
    props.onChange(value);
  };
  return (
    <FormComponentWrapper {...props}>
      <div className={props.theme.classes.selectWrapper}>
        <select
          className={classes.select}
          value={typeof props.value === "undefined" ? "" : props.value}
          id={props.id}
          name={props.name}
          required={props.component.required}
          disabled={props.component.disabled}
          onChange={change}
          {...props.attributes}
        >
          <option value="">
            {props.settings.notSelectedLabel ?? "- Select -"}
          </option>
          {options}
        </select>
      </div>
    </FormComponentWrapper>
  );
}
