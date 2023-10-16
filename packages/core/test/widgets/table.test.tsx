import * as React from "react";
import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import {
  textField,
  createForm,
  group,
  StatefulFormView,
  equals,
  booleanField,
  selectWidget,
  tableWidget,
} from "../../src";

describe("Table widget", () => {
  const form = createForm({
    group: group(
      {
        label: "Multiple group",
        required: true,
        multiple: true,
        multipleWidget: tableWidget(),
      },
      {
        first: textField({
          label: "First",
        }),
        second: textField({
          label: "Second",
          widget: selectWidget(["option 1", "option 2"]),
        }),
        // The header needs to be rendered even though its'
        third: [
          [
            "first",
            equals("first"),
            booleanField({
              label: "Third",
            }),
          ],
        ],
        // This column will either be the third or the foirth column
        fourth: textField({ label: "Fourth" }),
      },
    ),
  });
  test("Table label", async () => {
    render(<StatefulFormView form={form} />);
    const text = await screen.findByText("Multiple group");
    expect(text).toBeDefined();
  });
  test("Table header", async () => {
    const data = { group: [{}] };
    render(<StatefulFormView form={form} data={data} />);
    await screen.findByRole("table");
    expect(screen.queryAllByRole("columnheader")).toHaveLength(4);
  });
  test("Table row", async () => {
    const data = { group: [{}] };
    render(<StatefulFormView form={form} data={data} />);
    await screen.findByRole("table");
    expect(screen.queryAllByRole("row")).toHaveLength(2);
    await screen.findByLabelText("First");
    expect(screen.getByLabelText("First")).toBeInTheDocument();
  });
  test("Conditional field missing", async () => {
    const data = { group: [{}] };
    render(<StatefulFormView form={form} data={data} />);
    await screen.findByRole("table");
    expect(screen.queryByLabelText("Third")).toBeNull();
  });
  test("Conditional field exists", async () => {
    const data = { group: [{ first: "first" }] };
    render(<StatefulFormView form={form} data={data} />);
    await screen.findByRole("table");
    expect(screen.getByLabelText("Third")).toBeInTheDocument();
  });
});
