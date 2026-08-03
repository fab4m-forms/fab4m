import * as React from "react";
import { useEffect, useState } from "react";
import { DateRange, DateRangeWidgetSettings, WidgetProps } from "@fab4m/fab4m";
import { FormComponentWrapper } from "../components/FormComponentWrapper";

function toInputValue(value: Date | undefined, withTime: boolean): string {
  if (!value) {
    return "";
  }
  return withTime
    ? value.toISOString().slice(0, 16)
    : value.toISOString().slice(0, 10);
}

/**
 * A native date range widget with two labeled inputs.
 * See [the date component page](/docs/components/date) for an example.
 * @group React widgets
 */
export function DateRangeField(
  props: WidgetProps<DateRange, DateRangeWidgetSettings>,
): React.JSX.Element {
  const [state, changeState] = useState<Partial<DateRange>>(props.value ?? {});
  useEffect(() => {
    if (props.value) {
      changeState(props.value);
    }
  }, [props.value]);

  const withTime = !!props.settings.withTime;
  const type = withTime ? "datetime-local" : "date";
  const classes = props.theme.classes;
  const fromId = `${props.id}_from`;
  const toId = `${props.id}_to`;
  const fromName = `${props.name}[from]`;
  const toName = `${props.name}[to]`;

  const changeFromDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    const from = value ? new Date(value) : undefined;
    const newState = { ...state, from };
    changeState(newState);
    if (newState.from) {
      props.onChange({
        from: newState.from,
        to: newState.to,
      });
    }
  };
  const changeToDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    const to = value ? new Date(value) : undefined;
    const newState = { ...state, to };
    changeState(newState);
    if (state.from) {
      props.onChange({ from: state.from, to });
    }
  };

  return (
    <FormComponentWrapper {...props}>
      <div className={classes.dateRangeWrapper ?? "date-range-wrapper"}>
        <input
          type={type}
          className={classes.input}
          required={props.component.required}
          disabled={props.component.disabled}
          value={toInputValue(state.from, withTime)}
          onChange={changeFromDate}
          name={fromName}
          id={fromId}
          aria-label={props.settings.fromLabel}
          placeholder={props.settings.fromLabel}
          {...props.attributes}
        />
        <div className={classes.dateRangeSeparator ?? "date-range-separator"}>
          -
        </div>
        <input
          type={type}
          className={classes.input}
          required={!props.settings.optionalEndDate && !!state.from}
          disabled={props.component.disabled}
          value={toInputValue(state.to, withTime)}
          onChange={changeToDate}
          name={toName}
          id={toId}
          aria-label={props.settings.toLabel}
          placeholder={props.settings.toLabel}
          {...props.attributes}
        />
      </div>
    </FormComponentWrapper>
  );
}
