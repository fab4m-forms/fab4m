import * as React from "react";
import { useEffect, useState } from "react";
import { MultipleSettings } from ".";
import FormComponentView from "../../components/FormComponentView";
import { MultipleWidgetProps } from "../../widget";
import { FormComponent } from "../../component";
import ValidationErrors from "../../components/ValidationErrors";
import { componentErrors } from "../../form";
/**
 * The default Multiple widget.
 * @group React multiple widgets
 */
function Multiple(
  props: MultipleWidgetProps<unknown, MultipleSettings | undefined>,
) {
  const [items, changeItems] = useState<Array<unknown>>([]);
  useEffect(() => {
    changeItems(props.value ?? defaultItems(props.component, props.settings));
  }, [props.value]);
  const addItem = () => changeItems([...items, undefined]);
  const itemComponents = items.map((value, index) => {
    const changeValue = (changed: unknown) => {
      const newItems = [...items];
      newItems.splice(index, 1, changed);
      changeItems(newItems);
      props.onChange(newItems);
    };
    const removeValue = () => {
      const newItems = [...items];
      newItems.splice(index, 1);
      changeItems(newItems);
      props.onChange(newItems);
    };
    return (
      <div className={props.theme.classes.multipleItem} key={index}>
        <div className={props.theme.classes.multipleItemWrapper}>
          <FormComponentView
            theme={props.theme}
            component={props.component as FormComponent}
            value={value}
            index={index}
            errors={props.errors && componentErrors(`/${index}`, props.errors)}
            hideLabel={!props.settings?.multipleLabels}
            hideDescription={true}
            id={
              props.id
                ? `${props.id}-${index}`
                : `${props.component.name}-${index}`
            }
            attributes={
              !props.settings?.multipleLabels
                ? {
                    "aria-labelledby": `${props.id}-label`,
                  }
                : undefined
            }
            name={
              props.name
                ? `${props.name}[${index}]`
                : `${props.component.name}[${index}]`
            }
            onChange={changeValue}
          />
        </div>
        {(!props.component.minItems ||
          props.component.minItems < items.length) && (
          <div className={props.theme.classes.multipleActions}>
            <button
              className={props.theme.classes.removeItem}
              type={"button"}
              onClick={removeValue}
            >
              {props.settings?.removeItemLabel ?? "Remove"}
            </button>
          </div>
        )}
      </div>
    );
  });
  return (
    <div className={props.theme.classes.multipleItems}>
      {!props.settings?.multipleLabels && (
        <label className={props.theme.classes.label} id={`${props.id}-label`}>
          {props.component.label}
        </label>
      )}
      {itemComponents}
      {(!props.component.maxItems ||
        props.component.maxItems > items.length) && (
        <button
          type="button"
          onClick={addItem}
          id={`${props.id}-add`}
          className={props.theme.classes.addItem}
        >
          {props.settings?.addItemLabel ?? "Add"}
        </button>
      )}
      {props.component.description && (
        <div className={props.theme.classes.description}>
          {props.component.description}
        </div>
      )}
      {props.errors && props.errors.length > 0 && (
        <ValidationErrors
          classes={props.theme.classes}
          errors={props.errors.filter((e) => e.path.length === 0)}
        />
      )}
    </div>
  );
}

function defaultItems(component: FormComponent, settings?: MultipleSettings) {
  const noItems = component.minItems ?? settings?.defaultNoItems ?? 0;
  const values = [];
  for (let i = 0; i < noItems; i++) {
    values.push(undefined);
  }
  return values;
}

export default Multiple as React.FC;
