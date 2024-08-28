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
import { FormBuilderProvider, allPlugins, ExampleForm } from "../src";
import * as React from "react";

describe("Example form", () => {
  const form = serialize(
    createForm({
      first: textField({ label: "First component" }),
    }),
  );
  it("Render example form", async () => {
    render(
      <FormBuilderProvider
        form={form}
        formChanged={() => {}}
        plugins={allPlugins}
      >
        <ExampleForm theme={basic} />
      </FormBuilderProvider>,
    );
    expect(screen.getByLabelText("First component")).toBeVisible();
    // Submit should be hidden.
    expect(screen.queryByText("Save")).toBeNull();
  });

  it("Render example form, not with current theme", async () => {
    render(
      <FormBuilderProvider
        form={form}
        formChanged={() => {}}
        plugins={allPlugins}
      >
        <ExampleForm theme={tailwind} />
      </FormBuilderProvider>,
    );
    expect(screen.getByLabelText("First component")).toBeVisible();
  });
});
