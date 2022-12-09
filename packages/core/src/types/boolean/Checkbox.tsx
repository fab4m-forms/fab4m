import * as React from "react";
import { WidgetProps } from "../../widget";
/**
 * A checkbox react component.
 * @group React widgets
 */
function Checkbox(props: WidgetProps<boolean, undefined>) {
  const component = props.component;
  const classes = props.theme.classes;
  return (
    <div className={classes.elementWrapper}>
      <label htmlFor={props.id} className={classes.checkboxWrapper}>
        <input
          type="checkbox"
          className={classes.checkboxInput}
          required={component.required}
          checked={props.value ?? false}
          value={1}
          disabled={component.disabled}
          onChange={() => props.onChange(!props.value)}
          name={props.name}
          id={props.id}
          {...props.attributes}
        />
        {!props.hideLabel && <span> {component.label}</span>}
      </label>
    </div>
  );
}

export default Checkbox as React.FC;
