import * as React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import {
  textField,
  pageBreak,
  createForm,
  StatefulFormView,
  generatePartSchemas,
} from "../../src";

describe("Page break", () => {
  const form = createForm();
  form.add(textField({ name: "before", label: "Before page break" }));
  form.add(pageBreak({ name: "break", label: "Next page" }));
  form.add(textField({ name: "after", label: "After page break" }));
  let completed = false;
  form.onSubmit((e) => {
    e.preventDefault();
    completed = true;
  });
  afterEach(() => {
    completed = false;
  });
  test("Interactive page break form", async () => {
    const { queryByText, queryByLabelText, findByText } = render(
      <StatefulFormView form={form} />
    );
    expect(queryByText("Before page break")).toBeVisible();
    expect(queryByLabelText("After page break")).toBeNull();
    expect(queryByText("Previous")).toBeNull();
    let next = await findByText("Next");
    fireEvent.click(next);
    await waitFor(async () => {
      expect(queryByText("Next")).toBeNull();
      expect(queryByText("Before page break")).not.toBeVisible();
      expect(queryByLabelText("After page break")).toBeVisible();
    });
    const prev = await findByText("Previous");
    fireEvent.click(prev);
    await waitFor(async () => {
      expect(queryByText("Before page break")).toBeVisible();
      expect(queryByLabelText("After page break")).toBeNull();
    });
    next = await findByText("Next");
    fireEvent.click(next);
    const complete = await findByText("Complete");
    fireEvent.click(complete);
    await waitFor(async () => {
      expect(completed).toBe(true);
    });
  });
  test("Render form part", () => {
    let screen = render(<StatefulFormView form={form} part={0} />);
    expect(screen.queryByText("Before page break")).toBeVisible();
    expect(screen.queryByLabelText("After page break")).toBeNull();
    expect(screen.queryByText("Previous")).toBeNull();
    screen.unmount();
    screen = render(<StatefulFormView form={form} part={1} />);
    expect(screen.queryByText("Before page break")).toBeNull();
    expect(screen.queryByLabelText("After page break")).toBeVisible();
    expect(screen.queryByText("Previous")).toBeVisible();
  });
  test("Form part schemas", () => {
    const parts = generatePartSchemas(form);
    expect(parts).toHaveLength(2);
    expect(parts[0].properties).toHaveProperty("before");
    expect(parts[0].properties).not.toHaveProperty("after");
    expect(parts[1].properties).not.toHaveProperty("before");
    expect(parts[1].properties).toHaveProperty("after");
  });
});
