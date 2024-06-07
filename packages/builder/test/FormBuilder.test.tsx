import "@testing-library/jest-dom";
import "cross-fetch/polyfill";
import { createForm, textField, group, serialize } from "@fab4m/fab4m";
import { render, screen } from "@testing-library/react";
import { FormBuilder } from "../src";
import * as React from "react";

describe("Main Form builder component", () => {
  const form = serialize(
    createForm({
      first: textField({ label: "First component" }),
      group: group(
        { label: "Group" },
        {
          grouped_item: textField({ label: "Grouped item" }),
        },
      ),
    }),
  );
  it("form rendering", async () => {
    render(<FormBuilder form={form} formChanged={() => {}} />);
    expect(screen.queryByText("First component")).toBeVisible();
    expect(screen.queryByText("Grouped item")).toBeVisible();
    expect(screen.queryByText("Group")).toBeVisible();
  });
});
