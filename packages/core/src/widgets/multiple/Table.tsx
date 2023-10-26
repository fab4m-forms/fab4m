import * as React from "react";
import { TableSettings } from ".";
import { MultipleWidgetProps } from "../../widget";
import ValidationErrors from "../../components/ValidationErrors";
import { filterComponents } from "../../rule";
import {
  FormComponent,
  FormComponentVariant,
  FormComponentView,
  FormComponentWrapper,
  Labels,
  Theme,
  componentErrors,
  useFormData,
} from "../..";

/**
 * The table react widget.
 * @group React multiple widgets
 */
export default function Table(
  props: MultipleWidgetProps<unknown, TableSettings>,
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
      formData,
      false,
      value,
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
        <td className={props.theme.classes.operationsTd}>
          {!props.component.disabled && (
            <button
              className={props.theme.classes.removeItem}
              type={"button"}
              onClick={removeValue}
            >
              {props.settings.removeItemLabel ?? "Remove"}
            </button>
          )}
        </td>
      </tr>
    );
  });
  return (
    <FormComponentWrapper {...props}>
      {itemComponents.length > 0 && (
        <table className={props.theme.classes.table}>
          <thead>
            <tr className={props.theme.classes.headTr}>
              {props.component.components?.map((c, i) => (
                <HeaderCol
                  theme={props.theme}
                  labels={props.labels}
                  settings={props.settings}
                  index={i}
                  component={c}
                  key={i}
                />
              ))}
              <th className={props.theme.classes.operationsTh} />
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
    </FormComponentWrapper>
  );
}

function HeaderCol(props: {
  theme: Theme;
  labels?: Labels;
  index: number;
  settings: TableSettings;
  component: FormComponent | FormComponentVariant[];
}) {
  const component = Array.isArray(props.component)
    ? props.component[0].component
    : props.component;
  const content = (
    <>
      <span id={"label-" + component.name}>{component.label}</span>
      {component.required && (
        <span
          className={props.theme.classes.requiredIndicator}
          aria-label={props.labels?.required}
        >
          *
        </span>
      )}
    </>
  );

  return props.settings.headerColumn ? (
    props.settings.headerColumn({
      props: { className: props.theme.classes.th, children: content },
      index: props.index,
      component: component,
    })
  ) : (
    <th className={props.theme.classes.th}>{content}</th>
  );
}
