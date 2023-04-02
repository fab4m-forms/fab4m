import * as React from "react";
import "@testing-library/jest-dom";
import {
  fireEvent,
  render,
  RenderResult,
  waitFor,
} from "@testing-library/react";
import {
  textField,
  createForm,
  equals,
  FormView,
  and,
  or,
  group,
  StatefulFormView,
} from "../src";

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

  function nestedForm(multiple = false) {
    return createForm({
      group: group(
        { label: "Group", multiple },
        {
          inGroup: textField({ label: "In group" }),
          dependsOnInGroup: textField({
            label: "Dependent in group",
            rules: [
              [
                multiple ? "group.$.inGroup" : "group.inGroup",
                equals("dependent inside group"),
              ],
            ],
          }),
        }
      ),
      dependsOnInGroup: textField({
        label: "Depends on in group",
        rules: [
          [multiple ? "group.1.inGroup" : "group.inGroup", equals("In group")],
        ],
      }),
    });
  }

  test("Nested rules", async () => {
    const form = nestedForm();
    const { findByLabelText, queryByLabelText } = render(
      <StatefulFormView form={form} />
    );
    expect(queryByLabelText("Depends on in group")).toBeNull();
    expect(queryByLabelText("Dependent in group")).toBeNull();
    fireEvent.input(await findByLabelText("In group"), {
      target: { value: "In group" },
      value: "In group",
    });
    await waitFor(async () => {
      expect(await findByLabelText("Depends on in group")).toBeVisible();
      expect(queryByLabelText("Dependent in group")).toBeNull();
    });
    fireEvent.input(await findByLabelText("In group"), {
      target: { value: "dependent inside group" },
      value: "dependent inside group",
    });
    await waitFor(async () => {
      expect(await findByLabelText("Dependent in group")).toBeVisible();
    });
  });

  test("Nested array rules", async () => {
    const form = nestedForm(true);
    const { findByLabelText } = render(
      <FormView
        form={form}
        data={{
          group: [{ inGroup: "test" }, { inGroup: "In group" }],
        }}
      />
    );
    await waitFor(async () => {
      expect(await findByLabelText("Depends on in group")).toBeVisible();
    });
  });

  test("Rule inside of multiple group", async () => {
    const form = nestedForm(true);
    const { findByLabelText } = render(
      <FormView
        form={form}
        data={{
          group: [{ inGroup: "test" }, { inGroup: "dependent inside group" }],
        }}
      />
    );
    await waitFor(async () => {
      expect(await findByLabelText("Dependent in group")).toBeVisible();
    });
  });
});
