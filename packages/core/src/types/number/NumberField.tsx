import * as React from "react";
import { WidgetProps } from "../../widget";
import { NumberWidgetSettings } from ".";
import { ChangeEvent, useEffect, useState } from "react";
import FormComponentWrapper from "../../components/FormComponentWrapper";
/**
 * The number field widget component renders a number input.
 * @group React widgets
 */
export default function NumberField(
  props: WidgetProps<number, NumberWidgetSettings>,
): React.JSX.Element {
  const classes = props.theme.classes;
  const component = props.component;
  const convertValue = (value: string) => {
    return component.type.dataType === "float"
      ? parseFloat(value)
      : parseInt(value, 10);
  };
  const [draft, changeDraft] = useState<string | undefined>(
    props.value?.toString(),
  );

  useEffect(() => {
    changeDraft(props.value?.toString());
  }, [props.value]);

  const changeValue = (e: ChangeEvent<HTMLInputElement>) => {
    changeDraft(e.target.value);
    const value = convertValue(e.target.value);
    if (!isNaN(value)) {
      props.onChange(value);
    }
  };

  return (
    <FormComponentWrapper {...props} prefix={props.settings.prefix}>
      <input
        className={classes.input}
        required={component.required}
        value={draft ?? ""}
        disabled={component.disabled}
        onChange={changeValue}
        name={props.name}
        id={props.id}
        type="number"
        step={props.component.type.dataType === "float" ? "any" : undefined}
        {...props.attributes}
      />
    </FormComponentWrapper>
  );
}
