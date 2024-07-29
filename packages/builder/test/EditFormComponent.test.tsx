import "@testing-library/jest-dom";
import {
  SerializedComponent,
  createForm,
  serialize,
  textField,
} from "@fab4m/fab4m";
import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { FormBuilderProvider, allPlugins } from "../src";
import * as React from "react";
import { EditFormComponent } from "../src/components/EditFormComponent";

describe("Component form", () => {
  const form = serialize(
    createForm({
      text: textField({ name: "textfield", label: "Text field" }),
    }),
  );
  const Component = () => {
    const [draft, changeDraft] = React.useState(form);
    const component = draft.components[0] as SerializedComponent;

    return (
      <FormBuilderProvider
        plugins={allPlugins}
        form={draft}
        formChanged={changeDraft}
      >
        <EditFormComponent componentKey={"textfield"} />
        <h2>Component details</h2>
        <div>Label: {component.label}</div>
        <div>Description: {component.description}</div>
        <div>Required: {component.required ? "Yes" : "No"}</div>
      </FormBuilderProvider>
    );
  };

  it("Render form for component", async () => {
    render(<Component />);
    expect(screen.getByLabelText("Label")).toBeVisible();
    expect(screen.getByLabelText("Description")).toBeVisible();
    expect(screen.getByRole("checkbox", { name: "Required" })).toBeVisible();
    expect(screen.getByLabelText("Widget")).toBeVisible();
    expect(screen.getByRole("button", { name: "Add validator" })).toBeVisible();
    expect(screen.getByRole("button", { name: "Add rule" })).toBeVisible();
    expect(screen.getByRole("button", { name: "Save" })).toBeVisible();
  });
  it("Save basic component settings", async () => {
    render(<Component />);
    await userEvent.clear(screen.getByLabelText("Label"));
    await userEvent.type(screen.getByLabelText("Label"), "New component name");
    await userEvent.clear(screen.getByLabelText("Description"));
    await userEvent.type(
      screen.getByLabelText("Description"),
      "New component description",
    );
    await userEvent.click(screen.getByRole("checkbox", { name: "Required" }));
    await userEvent.click(screen.getByRole("button", { name: "Save" }));
    await waitFor(() => {
      expect(screen.getByText("Label: New component name")).toBeVisible();
      expect(
        screen.getByText("Description: New component description"),
      ).toBeVisible();
      expect(screen.getByText("Required: Yes")).toBeVisible();
    });
  });
});
