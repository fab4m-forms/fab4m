import * as React from "react";
import { WidgetProps } from "../widget";
import FormElement from "./FormElement";

/**
 * A general purpose component wrapper. This component can be used to make sure
 * all widgets renders form elements in a similar way.
 * @group React API
 */
export default function FormComponentWrapper(
  props: Omit<WidgetProps<any, any>, "onChange"> & {
    /**
     * The actual form widget contents.
     */
    children: React.ReactNode;
    /**
     * The id that should be applied to the form element.
     */
    id?: string;
    /**
     * The label for the form element.
     */
    label?: string;
    /**
     * Any prefix that should be rendered before the actual form element.
     */
    prefix?: string;
  }
): JSX.Element {
  const component = props.component;
  const classes = props.theme.classes;
  return (
    <FormElement
      id={props.id ? props.id : props.name}
      label={!props.hideLabel ? props.label ?? component.label : undefined}
      childrenClass={
        props.prefix ? classes.prefixedElementWrapper : classes.elementWrapper
      }
      required={component.required}
      requiredText={props.labels?.required ?? "Required"}
      requiredClass={classes.requiredIndicator}
      labelClass={classes.label}
      labelWrapperClass={classes.labelWrapper}
    >
      {props.prefix && (
        <div className={classes.inputPrefixWrapper}>
          <div className={classes.inputPrefix}>{props.prefix}</div>
        </div>
      )}
      {props.children}
    </FormElement>
  );
}
