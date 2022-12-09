import * as React from "react";
import "@testing-library/jest-dom";
import {
  fireEvent,
  render,
  RenderResult,
  waitFor,
} from "@testing-library/react";
import { textField, createForm, equals, FormView, and, or } from "../src";

describe("Rule engine", () => {
  const form = createForm();
  form.add(textField({ name: "first", label: "First" }));
  form.add(textField({ name: "always_visible", label: "Always visible" }));
  form.add(
    textField({
      name: "second",
      label: "Second",
      rules: [["first", equals("first")]],
    })
  );
  form.add(
    textField({
      name: "third",
      label: "Third",
      rules: [
        ["first", equals("first")],
        ["second", equals("second")],
      ],
    })
  );
  form.add(
    textField({
      name: "unreachable",
      label: "Unreachable",
      rules: [
        ["first", equals("first")],
        ["first", equals("second")],
      ],
    })
  );

  form.add(
    textField({
      name: "complex",
      label: "Complex",
      rules: [
        and([
          or([
            ["first", equals("first")],
            ["first", equals("second")],
          ]),
          or([
            ["second", equals("second")],
            ["second", equals("second")],
          ]),
        ]),
      ],
    })
  );

  form.onSubmit((e) => {
    e.preventDefault();
  });

  test("And rules", async () => {
    const renderForm = (screen?: RenderResult) => {
      if (screen) {
        screen.unmount();
      }
      return render(<FormView data={data} form={form} />);
    };
    const data = {
      first: "",
      second: "",
      unreachable: "",
    };
    let screen = renderForm();
    expect(screen.queryByText("Always visible")).not.toBeNull();
    expect(screen.queryByText("Second")).toBeNull();
    expect(screen.queryByText("Third")).toBeNull();
    expect(screen.queryByText("Unreachable")).toBeNull();
    data.first = "first";
    screen = renderForm(screen);
    expect(screen.queryByText("Second")).not.toBeNull();
    expect(screen.queryByText("Third")).toBeNull();
    expect(screen.queryByText("Unreachable")).toBeNull();
    data.second = "second";
    screen = renderForm(screen);
    expect(screen.queryByText("Second")).not.toBeNull();
    expect(screen.queryByText("Third")).not.toBeNull();
    expect(screen.queryByText("Unreachable")).toBeNull();
  });
  test("Data removal", async () => {
    let data: Record<string, unknown> = {
      first: "first",
      second: "third",
      third: "",
      unreachable: "",
    };

    form.onDataChange((newData) => {
      data = newData;
    });
    const screen = render(<FormView data={data} form={form} />);
    const element = await screen.findByLabelText("First");
    fireEvent.input(element, {
      value: "some other text",
      target: { value: "some other text" },
    });
    await waitFor(() => {
      expect(data.second).toBeUndefined();
      expect(data.third).toBeUndefined();
    });
  });

  test("Complex groups", () => {
    const data = {
      first: "first",
      second: "first",
      third: "",
      unreachable: "",
      complex: "",
    };
    let screen = render(<FormView data={data} form={form} />);
    expect(screen.queryByText("Complex")).toBeNull();
    data.second = "second";
    screen.unmount();
    screen = render(<FormView data={data} form={form} />);
    expect(screen.queryByText("Complex")).not.toBeNull();
  });
});
