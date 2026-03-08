import * as React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import {
  textField,
  createForm,
  callback,
  FormView,
  StatefulFormView,
} from "../../src";
import { getFormElement } from "../util";

describe("Callback rules", () => {
  const form = createForm();
  let id = 0;

  form.add(textField({ name: "first", label: "First" }));
  form.add(
    textField({
      name: "second",
      label: "Second",
      rules: [["first", callback((value) => value === "test")]],
    }),
  );
  form.add(
    textField({
      name: "third",
      label: "Third",
      rules: [["third", callback(() => id > 0)]],
    }),
  );
  form.add(
    textField({
      name: "validated",
      label: "Validated",
      validators: [
        callback((value) =>
          value !== "message" ? [{ path: "", message: "Not message" }] : [],
        ),
      ],
    }),
  );

  const data = {
    first: "",
    second: "",
  };

  test("Callback rule from value", async () => {
    let screen = render(<FormView data={data} form={form} />);
    expect(screen.queryByText("Second")).toBeNull();
    data.first = "test";
    screen.unmount();
    screen = render(<FormView data={data} form={form} />);
    expect(screen.queryByText("Second")).not.toBeNull();
  });

  test("Callback rule without value", async () => {
    let screen = render(<FormView data={data} form={form} />);
    expect(screen.queryByText("Third")).toBeNull();
    screen.unmount();
    id = 1;
    screen = render(<FormView data={data} form={form} />);
    expect(screen.queryByText("Third")).not.toBeNull();
  });
  test("Form validator", async () => {
    const { findByLabelText, queryByText, container } = render(
      <StatefulFormView form={form} />,
    );
    const formElement = getFormElement(container);
    fireEvent.input(await findByLabelText("Validated"), {
      target: { value: "nope" },
    });
    fireEvent.submit(formElement);
    await waitFor(() => {
      expect(queryByText("Not message")).not.toBeNull();
    });
  });
});
