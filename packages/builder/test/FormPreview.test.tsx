import "@testing-library/jest-dom";
import "cross-fetch/polyfill";
import {
  createForm,
  textField,
  serialize,
  basic,
  tailwind,
} from "@fab4m/fab4m";
import { render, screen } from "@testing-library/react";
import { FormBuilderProvider, allPlugins, FormPreview } from "../src";
import * as React from "react";

describe("Form preview", () => {
  const form = serialize(
    createForm({
      first: textField({ label: "First component" }),
    }),
  );
  it("Render form preview", async () => {
    render(
      <FormBuilderProvider
        form={form}
        formChanged={() => {}}
        plugins={allPlugins}
      >
        <FormPreview theme={basic} />
      </FormBuilderProvider>,
    );
    expect(screen.getByLabelText("First component")).toBeVisible();
    // Submit should be hidden.
    expect(screen.queryByText("Save")).toBeNull();
  });

  it("Render form preview, not with current theme", async () => {
    render(
      <FormBuilderProvider
        form={form}
        formChanged={() => {}}
        plugins={allPlugins}
      >
        <FormPreview theme={tailwind} />
      </FormBuilderProvider>,
    );
    expect(screen.getByLabelText("First component")).toBeVisible();
  });
});
