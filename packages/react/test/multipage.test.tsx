import * as React from "react";
import { render } from "@testing-library/react";
import { textField, createForm, equals, pageBreak, FormView, or } from "../src";

describe("Multi page", () => {
  const form = createForm(
    {},
    {
      labels: {
        next: "Next page",
        previous: "Previous page",
        complete: "Complete form",
      },
    },
  );
  form.add(textField({ name: "first", label: "First" }));
  form.add(pageBreak({ label: "First break", name: "first_break" }));
  form.add(
    textField({
      name: "second",
      label: "Second",
      rules: [["first", equals("first")]],
    }),
  );
  form.add(pageBreak({ label: "Second break", name: "second_break" }));
  form.add(
    textField({
      name: "third",
      label: "Third",
      rules: [
        or([
          ["first", equals("first2")],
          ["second", equals("second")],
        ]),
      ],
    }),
  );
  /*test("Complete disabled on last page", async () => {
    const data = {
      first: "wat",
    };
    const { findByText } = render(
      <FormView disabled={true} data={data} form={form} />
    );
    const complete = (await findByText("Complete form")) as HTMLButtonElement;
    expect(complete.disabled).toBe(true);
  });
  test("Pager works when disabled", async () => {
    const data = {
      first: "first",
    };
    const { findByText } = render(
      <FormView disabled={true} data={data} form={form} />
    );
    const complete = (await findByText("Next page")) as HTMLButtonElement;
    expect(complete.disabled).toBe(false);
  });

  test("Conditional pages", async () => {
    const data = {
      first: "first",
    };
    form.onSubmit((e) => {
      e.preventDefault();
    });
    const screen = render(<StatefulFormView data={data} form={form} />);
    fireEvent.click(screen.getByText("Next page"));
    await waitFor(() => {
      expect(screen.queryByLabelText("Second")).not.toBeNull();
    });
    fireEvent.input(screen.getByLabelText("Second"), {
      target: { value: "second" },
    });
    fireEvent.click(screen.getByText("Next page"));
    await waitFor(() => {
      expect(screen.queryByLabelText("Third")).not.toBeNull();
    });
    fireEvent.click(screen.getByText("Previous page"));
    waitFor(() => {
      expect(screen.queryByLabelText("Third")).toBeNull();
    });
    fireEvent.click(screen.getByText("Previous page"));
    waitFor(() => {
      expect(screen.queryByLabelText("Second")).toBeNull();
    });
    fireEvent.input(screen.getByLabelText("First"), {
      target: { value: "first2" },
    });
    await waitFor(() => {
      expect((screen.getByLabelText("First") as HTMLInputElement).value).toBe(
        "first2"
      );
      expect(screen.queryByText("Next page")).not.toBe(null);
    });
    fireEvent.click(screen.getByText("Next page"));
    await waitFor(() => {
      expect(screen.queryByLabelText("Second")).toBeNull();
      expect(screen.queryByLabelText("Third")).not.toBeNull();
    });
  });
});

describe("Multipage validation", () => {
  const form = createForm({
    before: textField({
      label: "Before",
      validators: [allowedValues(["before", "also ok"], "Not allowed!")],
    }),
    break: pageBreak({}),
    after: textField({
      label: "After",
      validators: [allowedValues(["after", "after ok, but also not ok"])],
    }),
  });
  test("Step-wise validation", async () => {
    const { findByLabelText, queryByLabelText, queryByText, container } =
      render(<StatefulFormView data={{ before: "not_before" }} form={form} />);
    const formElement = getFormElement(container);
    fireEvent.submit(formElement);
    await waitFor(() => {
      expect(queryByText("Not allowed!")).not.toBeNull();
    });
    fireEvent.input(await findByLabelText("Before"), {
      target: { value: "before" },
    });
    fireEvent.submit(formElement);
    await waitFor(() => {
      expect(queryByLabelText("After")).not.toBeNull();
    });
  });
  test("Step validation callback", async () => {
    form.onPartValidate(async (page, data) => {
      if (page === 0 && data.before && data.before === "before") {
        return [{ path: "/before", message: "Nope, that's not right" }];
      }
      if (
        page === 1 &&
        data.before === "also ok" &&
        data.after === "after ok, but also not ok"
      ) {
        return [{ path: "/after", message: "First one ok, but not this one" }];
      }
      return [];
    });
    const { queryByText, container, findByLabelText } = render(
      <StatefulFormView form={form} />
    );
    const formElement = getFormElement(container);
    fireEvent.input(await findByLabelText("Before"), {
      target: {
        value: "before",
      },
    });
    fireEvent.submit(formElement);
    await waitFor(() => {
      expect(queryByText("Nope, that's not right")).not.toBeNull();
    });
    fireEvent.input(await findByLabelText("Before"), {
      target: {
        value: "also ok",
      },
    });
    fireEvent.submit(formElement);
    fireEvent.input(await findByLabelText("After"), {
      target: {
        value: "after ok, but also not ok",
      },
    });
    fireEvent.submit(formElement);
    await waitFor(() => {
      expect(queryByText("First one ok, but not this one")).not.toBeNull();
    });
  });*/

  test("Hide submit", () => {
    const { container } = render(
      <FormView
        hideSubmit={true}
        data={{ first: "first", second: "second", third: "third" }}
        form={form}
        part={2}
      />,
    );
    expect(container.querySelector("button[value='complete']")).toBeNull();
  });
});
