import * as React from "react";
import { render } from "@testing-library/react";
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
        widget: tableWidget(),
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
            equals("text"),
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
  test("Table header", async () => {
    const data = { group: [] };
    const { findByRole, getByRole } = render(
      <StatefulFormView form={form} data={data} />,
    );
    await findByRole("table");
    expect(getByRole("row", { name: "Fourth" })).not.toBeNull();
  });
});
