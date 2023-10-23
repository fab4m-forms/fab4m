import * as React from "react";
import { MultipleSettings } from ".";
import { MultipleWidgetProps } from "../../widget";
import ValidationErrors from "../../components/ValidationErrors";
import { filterComponents } from "../../rule";
import { FormComponentView, componentErrors, useFormData } from "../..";

/**
 * The table react widget.
 * @group React multiple widgets
 */
export default function Table(
  props: MultipleWidgetProps<unknown, MultipleSettings>,
): JSX.Element | null {
  const items = (props.value ?? []) as Array<Record<string, unknown>>;
  const addItem = () => props.onChange([...items, {}]);
  const formData = useFormData();
  const itemComponents = items.map((value, index) => {
    const removeValue = () => {
      const newItems = [...items];
      newItems.splice(index, 1);
      props.onChange(newItems);
    };

    const components = filterComponents(
      props.component.components ?? [],
      value,
      false,
      formData,
    );
    const cols = props.component.components?.map((c, i) => {
      const component = Array.isArray(c) ? c[0].component : c;
      const match = components.find(
        (filteredComponent) => filteredComponent.name === component.name,
      );
      const changeChildValue = (name: string, newValue: unknown) => {
        const newItems = [...items];
        newItems[index] = {
          ...value,
          [name]: newValue,
        };
        props.onChange(newItems);
      };
      return (
        <td key={i} className={props.theme.classes.td}>
          {match ? (
            <FormComponentView
              value={value[match.name]}
              hideLabel={true}
              attributes={{ "aria-labelledby": `label-${component.name}` }}
              name={`${props.name}[${index}][${component.name}]`}
              index={index}
              errors={
                props.errors && componentErrors(`/${index}`, props.errors)
              }
              theme={props.theme}
              ssr={props.ssr}
              onChange={(value) => changeChildValue(component.name, value)}
              component={match}
            />
          ) : null}
        </td>
      );
    });
    return (
      <tr className={props.theme.classes.tr} key={index}>
        {cols}
        <td className={props.theme.classes.td}>
          <div className={props.theme.classes.rowOperations}>
            {!props.component.disabled && (
              <button
                className={props.theme.classes.removeItem}
                type={"button"}
                onClick={removeValue}
              >
                {props.settings.removeItemLabel ?? "Remove"}
              </button>
            )}
          </div>
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
        <table className={props.theme.classes.table}>
          <thead>
            <tr className={props.theme.classes.headTr}>
              {props.component.components?.map((c, i) => (
                <th
                  className={props.theme.classes.th}
                  key={i}
                  id={
                    "label-" + (Array.isArray(c) ? c[0].component.name : c.name)
                  }
                >
                  {Array.isArray(c) ? c[0].component.label : c.label}
                </th>
              ))}
              <th />
            </tr>
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
            {props.settings.addItemLabel ?? "Add"}
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
