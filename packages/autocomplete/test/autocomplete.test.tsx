import * as React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { autocompleteWidget } from "../src";
import { vi } from "vitest";
import { createForm, textField, integerField, FormView } from "@fab4m/fab4m";

describe("Password field", () => {
  const fakeItems = [];
  const profiles = [];

  for (let i = 0; i < 30; i++) {
    fakeItems.push([`Item ${i}`, i + 1]);
    profiles.push({
      name: `Item ${i + 1}`,
      picture:
        "https://upload.wikimedia.org/wikipedia/commons/7/7e/Circle-icons-profile.svg",
      description: `This is person ${i + 1}`,
    });
  }
  const form = createForm({
    strings: textField({
      label: "Strings",
      widget: autocompleteWidget({ items: ["test", "test2", "Test3"] }),
    }),
    labels: textField({
      label: "Labels",
      widget: autocompleteWidget({
        items: [
          ["Test label", "test"],
          ["Test label 2", "test2"],
        ],
      }),
    }),
    numbers: integerField({
      label: "Numbers",
      widget: autocompleteWidget({ items: [1, 2] }),
    }),
    callback: integerField({
      label: "Callback",
      widget: autocompleteWidget({
        items: async (search) =>
          !search
            ? []
            : fakeItems.filter((item) =>
                item[0].toLowerCase().includes(search.toLowerCase())
              ),
      }),
    }),
    customElement: integerField({
      label: "Custom element",
      widget: autocompleteWidget({
        itemElement: (value) => {
          const profile = profiles[value - 1];
          return (
            <div>
              <div style={{ display: "flex" }}>
                <img width="30" height="30" src={profile.picture} />
                <h3 style={{ margin: "auto .2em" }}>{profile.name}</h3>
              </div>
              <div>{profile.description}</div>
            </div>
          );
        },
        items: async (search) =>
          !search
            ? []
            : fakeItems.filter((item) =>
                item[0].toLowerCase().includes(search.toLowerCase())
              ),
      }),
    }),
  });

  const testAutocomplete = (
    key: string,
    label: string,
    inputValue: string,
    labels: string[],
    itemLabel: string,
    formValue: string | number
  ) => {
    return async () => {
      let value: string | undefined;
      const spy = vi.fn().mockImplementation((data) => {
        value = data[key];
      });
      form.onDataChange(spy);
      const { findAllByLabelText, queryByText, findByText } = render(
        <FormView form={form} data={{}} />
      );
      const element = (await findAllByLabelText(label))[1] as HTMLInputElement;
      fireEvent.input(element, { target: { value: inputValue } });
      await waitFor(() => {
        for (const label of labels) {
          expect(queryByText(label)).not.toBe(null);
        }
      });
      fireEvent.click(await findByText(itemLabel));
      await waitFor(async () => {
        expect(spy).toHaveBeenCalled();
        expect(value).toBe(formValue);
      });
    };
  };

  test(
    "Autcomplete, list of strings",
    testAutocomplete(
      "strings",
      "Strings",
      "test",
      ["test", "test2"],
      "test",
      "test"
    )
  );
  test(
    "Autcomplete, labels",
    testAutocomplete(
      "labels",
      "Labels",
      "test",
      ["Test label", "Test label 2"],
      "Test label",
      "test"
    )
  );
  test(
    "Autcomplete, callback",
    testAutocomplete(
      "callback",
      "Callback",
      "item 1",
      ["Item 1", "Item 10"],
      "Item 10",
      11
    )
  );

  test("Custom element", async () => {
    const { findAllByLabelText, queryByText } = render(
      <FormView form={form} data={{}} />
    );
    const element = (
      await findAllByLabelText("Custom element")
    )[1] as HTMLInputElement;
    fireEvent.input(element, { target: { value: "item" } });
    await waitFor(() => {
      expect(queryByText("This is person 1")).not.toBeNull();
    });
  });

  test("Autocomplete search", async () => {
    const { findAllByLabelText, queryByText } = render(
      <FormView form={form} data={{}} />
    );
    const element = (
      await findAllByLabelText("Strings")
    )[1] as HTMLInputElement;
    // Uppercase search => lowercase
    fireEvent.input(element, { target: { value: "Test" } });
    await waitFor(() => {
      expect(queryByText("test")).not.toBeNull();
    });
    // items to lowercase
    fireEvent.input(element, { target: { value: "test" } });
    await waitFor(() => {
      expect(queryByText("Test3")).not.toBeNull();
    });
  });
});
