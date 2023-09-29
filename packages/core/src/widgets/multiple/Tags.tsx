import * as React from "react";
import { useState } from "react";
import { FormComponent } from "../../component";
import { TagsSettings } from ".";
import FormComponentView from "../../components/FormComponentView";
import { MultipleWidgetProps } from "../../widget";
import {
  findOption,
  isOptionGroup,
  optionValue,
  SelectWidgetSettings,
} from "../options";
import ValidationErrors from "../../components/ValidationErrors";
/**
 * The Tags react widget.
 * @group React multiple widgets
 */
export default function Tags<Value>(
  props: MultipleWidgetProps<Value, TagsSettings | undefined>,
): JSX.Element | null {
  const addItem = (value: Value) => props.onChange([...items, value]);
  const items = props.value ?? [];
  const settings = allSettings(props.settings);
  const errors = props.errors ?? [];
  const [draft, changeDraft] = useState<Value | undefined>(undefined);
  const changeOrAdd = (data: unknown) => {
    changeDraft(data as Value | undefined);
    if (typeof data !== "undefined" && settings.addOnChange) {
      changeDraft(undefined);
      addItem(data as Value);
    }
  };
  const addButtonClicked = () => {
    if (typeof draft !== "undefined") {
      changeDraft(undefined);
      addItem(draft);
    }
  };
  const itemExists =
    draft && items.findIndex((value) => value === draft) !== -1;
  if (itemExists) {
    errors.push({ path: "", message: settings.itemAlreadyAddedMessage });
  }
  const itemComponents = items.map((value, index) => {
    const removeValue = () => {
      const newItems = [...items];
      newItems.splice(index, 1);
      props.onChange(newItems);
    };
    const displayValue = getDisplayValue(props.component, value);
    return (
      <div className={props.theme.classes.tag} key={index}>
        <div className={props.theme.classes.tagLabel}>{displayValue}</div>
        {!props.component.disabled && (
          <button
            className={props.theme.classes.removeTag}
            type={"button"}
            onClick={removeValue}
          >
            {settings.removeItemLabel}
          </button>
        )}
      </div>
    );
  });
  return (
    <div className={props.theme.classes.tags}>
      {props.component.label && (
        <label className={props.theme.classes.label} htmlFor={props.id}>
          {props.component.label}
        </label>
      )}
      {itemComponents.length > 0 && (
        <div className={props.theme.classes.addedTags}>{itemComponents}</div>
      )}
      {!props.component.disabled &&
        (!props.component.maxItems ||
          props.component.maxItems > items.length) && (
          <div className={props.theme.classes.addTagWrapper}>
            <FormComponentView
              value={draft}
              onChange={changeOrAdd}
              index={0}
              hideLabel={true}
              name={props.name}
              theme={props.theme}
              component={
                alterComponent(props.component, props.value) as FormComponent
              }
            />
            {!settings.addOnChange && (
              <button
                type="button"
                disabled={typeof draft === "undefined" || !!itemExists}
                onClick={addButtonClicked}
                id={`${props.id}-add`}
                className={props.theme.classes.addTag}
              >
                {settings.addItemLabel}
              </button>
            )}
          </div>
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

function getDisplayValue<Value>(
  component: FormComponent<Value>,
  value: Value,
): string | number | React.ReactNode | undefined {
  const validValue = (value: Value) =>
    typeof value === "number" || typeof value === "string" ? value : undefined;
  if (component.widget.type.name !== "select") {
    return validValue(value);
  }
  const settings = component.widget.settings as SelectWidgetSettings<Value>;
  const option = findOption(settings.options, value);
  if (!option) {
    return validValue(value);
  }
  return Array.isArray(option) ? option[0] : validValue(option);
}

function alterComponent<Value>(
  component: FormComponent<Value>,
  values: Value[] | undefined,
): FormComponent<Value> {
  // We need to clone the relevant bits so that we don't break the
  // original objects.
  const alteredComponent = {
    ...component,
    widget: {
      ...component.widget,
      settings: { ...component.widget.settings },
    },
    description: undefined,
    required: false,
  };
  if (component.widget.type.name === "select" && values) {
    const newOptions = [];
    for (const option of component.widget.settings.options) {
      if (
        !isOptionGroup(option) &&
        values.findIndex((value) => value === optionValue(option)) === -1
      ) {
        newOptions.push(option);
      }
    }
    alteredComponent.widget.settings.options = newOptions;
  }
  return alteredComponent;
}

function allSettings(settings?: TagsSettings): Required<TagsSettings> {
  return {
    addItemLabel: settings?.addItemLabel ?? "Add",
    removeItemLabel: settings?.removeItemLabel ?? "Remove",
    addOnChange: settings?.addOnChange ?? false,
    itemAlreadyAddedMessage:
      settings?.itemAlreadyAddedMessage ?? "This item has already been added",
  };
}
