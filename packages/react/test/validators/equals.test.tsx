import * as React from "react";
import { fireEvent, waitFor } from "@testing-library/react";
import { FormView, StatefulFormView } from "../../src/index";
import { textField, createForm, equals } from "@fab4m/fab4m";
import { getFormElement, renderWithProvider } from "../util";


describe("Equals", () => {
  const form = createForm();

  form.add(textField({ name: "first", label: "First" }));
  form.add(
    textField({
      name: "second",
      label: "Second",
      required: true,
      rules: [["first", equals("first")]],
    }),
  );
  const third = textField({
    name: "third",
    label: "Third",
    validators: [equals("third", "Custom message with %compare")],
  });

  form.add(third);
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
    data.first = "first";
    screen.unmount();
    screen = renderWithProvider(<FormView data={data} form={form} />);
    expect(screen.queryByText("Second")).not.toBeNull();
  });

  test("Form validator", async () => {
    const { findByLabelText, queryByText, container } = renderWithProvider(
      <StatefulFormView form={form} />,
    );
    const formElement = getFormElement(container);
    fireEvent.input(await findByLabelText("Third"), {
      target: { value: "nope" },
    });
    fireEvent.submit(formElement);
    await waitFor(() => {
      expect(queryByText("Custom message with third")).not.toBeNull();
    });
  });
});
