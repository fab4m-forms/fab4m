import * as React from "react";
import { MultipleSettings } from ".";
import { MultipleWidgetProps } from "../../widget";
import ValidationErrors from "../../components/ValidationErrors";

/**
 * The table react widget.
 * @group React multiple widgets
 */
export default function Table<Value>(
  props: MultipleWidgetProps<Value, MultipleSettings>
): JSX.Element | null {
  const items = props.value ?? [];
  const addItem = () => props.onChange([...items, {}]);
  const itemComponents = items.map((value, index) => {
    const removeValue = () => {
      const newItems = [...items];
      newItems.splice(index, 1);
      props.onChange(newItems);
    };
    console.log("items", items);
    return (
      <tr className={props.theme.classes.tr} key={index}>
        <td>
          {!props.component.disabled && (
            <button
              className={props.theme.classes.removeTag}
              type={"button"}
              onClick={removeValue}
            >
              {props.settings.removeItemLabel}
            </button>
          )}
        </td>
      </tr>
    );
  });
  return (
    <div className={props.theme.classes.componentWrapper}>
      {props.component.label && (
        <label className={props.theme.classes.label} htmlFor={props.id}>
          {props.component.label}
        </label>
      )}
      {itemComponents.length > 0 && (
        <table className={props.theme.classes.addedTags}>
          <thead>
            {props.component.components?.map((c) => (
              <th>{Array.isArray(c) ? c[0].component.label : c.label}</th>
            ))}
          </thead>
          <tbody>{itemComponents}</tbody>
        </table>
      )}
      {!props.component.disabled &&
        (!props.component.maxItems ||
          props.component.maxItems > items.length) && (
          <button
            type="button"
            onClick={addItem}
            id={`${props.id}-add`}
            className={props.theme.classes.addItem}
          >
            {props.settings.addItemLabel}
          </button>
        )}
      {props.component.description && (
        <div className={props.theme.classes.description}>
          {props.component.description}
        </div>
      )}
      {props.errors && (
        <ValidationErrors errors={props.errors} classes={props.theme.classes} />
      )}
    </div>
  );
}
