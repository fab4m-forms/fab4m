import * as React from "react";
import FormComponentWrapper from "../components/FormComponentWrapper";
import { WidgetProps } from "../widget";
import {
  Option,
  OptionGroup,
  SelectWidgetSettings,
  isOptionGroup,
  optionValue,
} from "./options";
type OptionsValue = "string" | "number";

function renderOption<OptionsType extends OptionsValue>(
  option: Option<OptionsType> | OptionGroup<OptionsType>,
  index: number
) {
  return isOptionGroup(option) ? (
    <optgroup key={index} label={option[0]}>
      {option[1].map(renderOption)}
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
function Select<OptionsType extends OptionsValue>(
  props: WidgetProps<OptionsType, SelectWidgetSettings<OptionsType>>
) {
  const classes = props.theme.classes;
  const options = props.settings.options.map(renderOption);
  const change = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let value;
    switch (props.component.type.dataType) {
      case "integer":
        value = parseInt(e.target.value, 10);
        break;
      case "float":
        value = parseFloat(e.target.value);
        break;
      default:
        value = e.target.value;
    }
    props.onChange(value as OptionsType);
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

export default Select as React.FC;
