import * as React from "react";

import { FormView } from "../../src/index";
import { textField, createForm, equals, or } from "@fab4m/fab4m";
import { renderWithProvider } from "../util";


describe("Or", () => {
  const form = createForm();
  form.add(textField({ name: "first", label: "First" }));
  form.add(
    textField({
      name: "second",
      label: "Second",
      required: true,
      rules: [
        or([
          ["first", equals("choice1")],
          ["first", equals("choice2")],
        ]),
      ],
    }),
  );
  test("Equals rule", async () => {
    const data = {
      first: "",
      second: "",
    };
    form.onSubmit((e) => {
      e.preventDefault();
    });
    let screen = renderWithProvider(<FormView data={data} form={form} />);
    expect(screen.queryByText("Second")).toBeNull();
    const checkChoice = (choice: string) => {
      data.first = choice;
      screen.unmount();
      screen = renderWithProvider(<FormView data={data} form={form} />);
      expect(screen.queryByText("Second")).not.toBeNull();
    };
    checkChoice("choice1");
    checkChoice("choice2");
  });
});
