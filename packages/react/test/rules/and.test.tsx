import * as React from "react";

import { textField, createForm, equals, and, FormView } from "../../src";
import { renderWithProvider } from "../util";


describe("And", () => {
  const form = createForm();
  form.add(textField({ name: "first", label: "First" }));
  form.add(textField({ name: "second", label: "Second" }));
  form.add(
    textField({
      name: "third",
      label: "Third",
      required: true,
      rules: [
        and([
          ["first", equals("choice1")],
          ["second", equals("choice2")],
        ]),
      ],
    }),
  );
  test("And rule", async () => {
    const data = {
      first: "",
      second: "",
      third: "",
    };
    form.onSubmit((e) => {
      e.preventDefault();
    });
    let screen = renderWithProvider(<FormView data={data} form={form} />);
    expect(screen.queryByText("Third")).toBeNull();
    const checkChoice = (
      firstChoice: string,
      secondChoice: string,
      visible: boolean,
    ) => {
      data.first = firstChoice;
      data.second = secondChoice;
      screen.unmount();
      screen = renderWithProvider(<FormView data={data} form={form} />);
      if (visible) {
        expect(screen.queryByText("Third")).not.toBeNull();
      } else {
        expect(screen.queryByText("Third")).toBeNull();
      }
    };
    checkChoice("choice1", "choice3", false);
    checkChoice("choice1", "choice2", true);
  });
});
