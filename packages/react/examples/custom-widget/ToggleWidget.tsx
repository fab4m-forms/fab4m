import * as React from "react";
import { WidgetProps } from "@fab4m/fab4m";

/**
 * A toggle switch widget. Mirrors the ToggleWidget from the svelte
 * package testbed.
 */
export function ToggleWidget(
  props: WidgetProps<boolean, unknown>,
): React.JSX.Element {
  const [isOn, setIsOn] = React.useState(props.value ?? false);
  const toggle = () => {
    const next = !isOn;
    setIsOn(next);
    props.onChange(next);
  };
  return (
    <div className="toggle-widget">
      <label htmlFor={props.id}>{props.component.label}</label>
      {props.component.description ? (
        <p className="description">{props.component.description}</p>
      ) : null}
      <div className="toggle-container">
        <button
          type="button"
          id={props.id}
          className={`toggle-switch ${isOn ? "on" : "off"}`}
          onClick={toggle}
          role="switch"
          aria-checked={isOn}
          aria-label={props.component.label}
        >
          <span className="toggle-slider"></span>
        </button>
        <span className="toggle-label">{isOn ? "ON" : "OFF"}</span>
      </div>
      <input type="hidden" name={props.name} value={isOn ? "true" : "false"} />
    </div>
  );
}
