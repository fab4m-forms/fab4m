import * as React from "react";
import { WidgetProps, optionValue, ThemeClasses } from "@fab4m/fab4m";
import Downshift from "downshift";
import { AutocompleteSettings, Option } from ".";

export default function Autocomplete<
  OptionType extends string | number,
  Context = undefined,
>(props: WidgetProps<OptionType, AutocompleteSettings<OptionType, Context>>) {
  // The loaded items contains the currently loaded items from
  // when the items setting is a callback.
  const [loadedItems, changeLoadedItems] = React.useState<
    Option<OptionType, Context>[]
  >([]);
  const [currentValue, changeCurrentValue] = React.useState<
    OptionType | string | undefined
  >(props.value ? findValueLabel(props.value) : "");
  // Update the internal value with the value from the form.
  React.useEffect(() => {
    changeCurrentValue(props.value ? findValueLabel(props.value) : "");
  }, [props.value]);
  function findValueLabel(value: OptionType) {
    const items =
      typeof props.settings.items === "function"
        ? loadedItems
        : props.settings.items;
    const result = items.find((item) => optionValue(item) === value);
    return result ? itemLabel(result) : "";
  }
  const search = (search: string) => {
    changeCurrentValue(search);
    if (search.length === 0) {
      props.onChange(undefined);
    }
    if (typeof props.settings.items === "function") {
      props.settings.items(search).then(changeLoadedItems);
    }
  };
  const getItems = (search?: string | null): Option<OptionType>[] => {
    const itemsToShow =
      typeof props.settings.items === "function"
        ? loadedItems
        : props.settings.items;
    return search
      ? itemsToShow.filter((item) =>
          itemLabel(item).toLowerCase().includes(search.toLowerCase()),
        )
      : itemsToShow;
  };

  return (
    <>
      <input type="hidden" name={props.name} value={props.value ?? ""} />
      <Downshift
        onChange={(selection) => {
          props.onChange(optionValue(selection));
        }}
        inputValue={currentValue ? currentValue.toString() : ""}
        selectedItem={props.value ?? ""}
        onInputValueChange={(value) => search(value)}
        itemToString={(item) => {
          return item ? itemLabel(item) : "";
        }}
      >
        {({
          getInputProps,
          getItemProps,
          getLabelProps,
          getMenuProps,
          isOpen,
          inputValue,
          highlightedIndex,
          selectedItem,
          getRootProps,
        }) => (
          <div className={props.theme.classes.componentWrapper}>
            <label className={props.theme.classes.label} {...getLabelProps()}>
              {props.component.label}
            </label>
            <div {...getRootProps({}, { suppressRefError: true })}>
              <input
                {...getInputProps()}
                className={props.theme.classes.input}
                name={props.component.name}
                required={props.component.required}
                disabled={props.component.disabled}
              />
            </div>
            <div className={props.theme.classes.autocompleteContainer}>
              <ul
                {...getMenuProps()}
                className={`${props.theme.classes.autocompleteList} ${
                  isOpen && props.theme.classes.autocompleteListOpen
                }`}
              >
                {isOpen
                  ? getItems(inputValue).map((item, index) => (
                      <li
                        className={props.theme.classes.autocompleteItem}
                        {...getItemProps(
                          optionItemProps(
                            item,
                            index,
                            highlightedIndex,
                            selectedItem,
                            props.theme.classes,
                          ),
                        )}
                      >
                        {props.settings.itemElement
                          ? props.settings.itemElement(
                              optionValue(item),
                              itemLabel(item),
                              itemContext(item),
                            )
                          : Array.isArray(item)
                          ? item[0]
                          : item}
                      </li>
                    ))
                  : null}
              </ul>
            </div>
          </div>
        )}
      </Downshift>
    </>
  );
}

function itemLabel<OptionType>(item: Option<OptionType>) {
  const value = Array.isArray(item) ? item[0] : item;
  return (value as string | number).toString();
}

function itemContext<OptionType>(item: Option<OptionType>) {
  return Array.isArray(item) && item[2] ? item[2] : undefined;
}

function optionItemProps(
  item: Option<any>,
  index: number,
  highlightedIndex: number | null,
  selectedItem: Option<any>,
  theme: ThemeClasses,
) {
  const value = optionValue(item).toString();
  const classes = [theme.autocompleteItem];
  if (highlightedIndex === index) {
    classes.push(theme.highlightedAutocompleteItem);
  }
  if (selectedItem === item) {
    classes.push(theme.selectedAutocompleteItem);
  }
  return {
    key: value,
    index,
    item,
    className: classes.join(" "),
  };
}
