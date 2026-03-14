import React from "react";
import { screen, render } from "@testing-library/react";
import { textField, basic, FormComponent } from "@fab4m/fab4m"
import {FormComponentView} from "../src";

test("Form label", async () => {
  const field = textField({ label: "My label" });
  renderField(field);
  await screen.findByLabelText("My label");
  expect(screen.queryByText("*")).toBeNull();
});

test("Required form label", async () => {
  const field = textField({ label: "My label", required: true });
  renderField(field);
  await screen.findByLabelText("My label");
  expect(screen.getByText("*")).toBeInTheDocument();
});

test("Hidden form label", async () => {
  const field = textField({ label: "My label", required: true });
  renderField(field, true);
  await screen.findByRole("textbox");
  expect(screen.queryByText("*")).toBeNull();
});

function renderField(field: FormComponent, hideLabel?: boolean) {
  render(
    <FormComponentView
      onChange={() => {}}
      component={field}
      hideLabel={hideLabel}
      theme={basic}
      name={"field"}
    />,
  );
}
