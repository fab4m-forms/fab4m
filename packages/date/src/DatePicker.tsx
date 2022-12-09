import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { WidgetProps, FormComponentWrapper } from "fab4m";
import {
  DateFieldWidgetSettings,
  DateRange,
  DateRangeWidgetSettings,
} from "./index";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import { Locale } from "date-fns";

export function DatePicker(
  props: WidgetProps<Date, DateFieldWidgetSettings> & { withTime?: boolean }
) {
  const pickerId = `${props.id}_picker`;
  const { theme } = props;
  let locale: LoadedLocale | undefined;
  if (props.settings.useBrowserLocale && props.settings.locales) {
    locale = useBrowserLocale(props.settings.locales);
  } else if (props.settings.locale) {
    locale = useLocale(props.settings.locale);
    if (!locale) {
      return null;
    }
  }
  return (
    <FormComponentWrapper {...props} id={pickerId}>
      {props.ssr ? (
        <input
          {...props.attributes}
          type={props.withTime ? "datetime-local" : "date"}
          name={props.name}
          className={theme.classes.input}
          id={pickerId}
          value={
            props.withTime
              ? props.value?.toISOString()
              : props.value?.toISOString().split("T")[0]
          }
        />
      ) : (
        <>
          <input
            type="hidden"
            name={props.name}
            value={
              props.withTime
                ? props.value?.toISOString()
                : props.value?.toISOString().split("T")[0]
            }
          />
          <ReactDatePicker
            {...props.attributes}
            id={pickerId}
            dateFormat={dateFormat(props.settings, props.withTime)}
            locale={locale?.locale}
            calendarStartDay={locale?.weekStartDay}
            className={theme.classes.input}
            showTimeSelect={props.withTime}
            selected={props.value}
            onChange={props.onChange}
          />
        </>
      )}
    </FormComponentWrapper>
  );
}

export function DateRangePicker(
  props: WidgetProps<DateRange, DateRangeWidgetSettings>
) {
  const [state, changeState] = useState<Partial<DateRange>>(props.value ?? {});
  useEffect(() => {
    if (props.value) {
      changeState(props.value);
    }
  }, [props.value]);
  const changeFromDate = (date: Date | null) => {
    const newState = {
      ...state,
      from: date ?? undefined,
    };
    changeState(newState);
    if (newState.to && newState.from) {
      props.onChange({ from: newState.from, to: newState.to });
    }
  };
  const changeToDate = (date: Date | null) => {
    const newState = { ...state, to: date ?? undefined };
    changeState(newState);
    if (newState.from) {
      props.onChange({ from: newState.from, to: newState.to });
    }
  };
  let locale: LoadedLocale | undefined;
  if (props.settings.useBrowserLocale && props.settings.locales) {
    locale = useBrowserLocale(props.settings.locales);
  } else if (props.settings.locale) {
    locale = useLocale(props.settings.locale);
    if (!locale) {
      return null;
    }
  }
  const fromId = `${props.id}_from`;
  const toId = `${props.id}_to`;
  return (
    <div className={props.theme.classes.componentWrapper}>
      <label className={props.theme.classes.label}>
        {props.component.label}
      </label>
      <input
        type="hidden"
        name={`${props.name}[from]`}
        value={props.value?.from.toISOString()}
      />
      <input
        type="hidden"
        name={`${props.name}[to]`}
        value={props.value?.to ? props.value.to.toISOString() : undefined}
      />
      <div
        className={props.theme.classes.dateRangeWrapper ?? "date-range-wrapper"}
      >
        <ReactDatePicker
          {...props.attributes}
          selectsStart
          id={fromId}
          locale={locale?.locale}
          dateFormat={dateFormat(props.settings, props.settings.withTime)}
          required={props.component.required}
          aria-label={props.settings.fromLabel}
          placeholderText={props.settings.fromLabel}
          className={props.theme.classes.input}
          startDate={state.from}
          endDate={state.to}
          maxDate={state.to}
          onChange={changeFromDate}
          selected={state.from}
          showTimeSelect={props.settings.withTime}
        />
        <div
          className={
            props.theme.classes.dateRangeSeparator
              ? props.theme.classes.dateRangeSeparator
              : "date-range-separator"
          }
        >
          -
        </div>
        <ReactDatePicker
          {...props.attributes}
          selectsEnd
          id={toId}
          locale={locale?.locale}
          dateFormat={dateFormat(props.settings, props.settings.withTime)}
          placeholderText={props.settings.toLabel}
          aria-label={props.settings.toLabel}
          className={props.theme.classes.input}
          startDate={state.from}
          endDate={state.to}
          minDate={state.from}
          required={!props.settings.optionalEndDate && !!state?.from}
          onChange={changeToDate}
          selected={state?.to}
          showTimeSelect={props.settings.withTime}
        />
      </div>
    </div>
  );
}

export function DateTimePicker(
  props: WidgetProps<Date, DateFieldWidgetSettings>
) {
  return <DatePicker {...props} withTime={true} />;
}
interface LoadedLocale {
  id: string;
  locale: Locale;
  weekStartDay: number;
}

function dateFormat(settings: DateFieldWidgetSettings, withTime?: boolean) {
  if (settings.format) {
    return settings.format;
  }
  return withTime ? "Pp" : "P";
}

function localeFromObject(locale: Locale): LoadedLocale {
  return {
    id: locale.code ?? "",
    locale,
    weekStartDay: locale.options?.weekStartsOn
      ? locale.options.weekStartsOn
      : 0,
  };
}

function useLocale(locale: Locale): LoadedLocale | undefined {
  return useMemo(() => {
    if (!locale.code) {
      return undefined;
    }
    registerLocale(locale.code, locale);
    return localeFromObject(locale);
  }, [locale]);
}

function useBrowserLocale(locales: Locale[]): LoadedLocale | undefined {
  return useMemo(() => {
    for (const code of navigator.languages) {
      const matchingLocale = locales.find(
        (locale) => locale.code && locale.code === code
      );
      if (matchingLocale && matchingLocale.code) {
        registerLocale(matchingLocale.code, matchingLocale);
        return localeFromObject(matchingLocale);
      }
    }
    if (locales.length > 0 && locales[0].code) {
      registerLocale(locales[0].code, locales[0]);
      return localeFromObject(locales[0]);
    }
    return undefined;
  }, locales);
}
