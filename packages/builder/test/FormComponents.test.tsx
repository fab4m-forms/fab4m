import "@testing-library/jest-dom";
import "cross-fetch/polyfill";
import { createForm, textField, group, serialize } from "@fab4m/fab4m";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { FormComponents, FormBuilderProvider, allPlugins } from "../src";
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
    render(
      <FormBuilderProvider
        form={form}
        formChanged={() => {}}
        plugins={allPlugins}
      >
        <FormComponents />
      </FormBuilderProvider>,
    );
    expect(screen.queryByText("First component")).toBeVisible();
    expect(screen.queryByText("Grouped item")).toBeVisible();
    expect(screen.queryByText("Group")).toBeVisible();
  });
  it("Component actions", async () => {
    const Component = () => {
      const [draft, changeDraft] = React.useState(form);
      return (
        <FormBuilderProvider
          form={draft}
          formChanged={changeDraft}
          plugins={allPlugins}
        >
          <FormComponents
            actions={({
              component,
              removeComponent,
              updateComponent,
              formKey,
            }) => (
              <div>
                <button onClick={removeComponent}>
                  Delete {component.label}
                </button>
                <button
                  onClick={() =>
                    updateComponent({ ...component, label: "Changed label" })
                  }
                >
                  Edit {component.label}
                </button>
                <a href={`/${formKey}`}>Link to {component.label}</a>
              </div>
            )}
          />
        </FormBuilderProvider>
      );
    };
    render(<Component />);
    expect(screen.queryByText("Delete First component")).toBeVisible();
    expect(screen.queryByText("Delete Group")).toBeVisible();
    expect(screen.queryByText("Delete Grouped item")).toBeVisible();
    expect(screen.getByText("Link to First component")).toHaveAttribute(
      "href",
      "/root:first",
    );
    fireEvent.click(screen.getByText("Edit First component"));
    await screen.findByText("Changed label");
    fireEvent.click(screen.getByText("Delete Changed label"));
    await waitFor(() => {
      expect(screen.queryByText("Delete Changed label")).toBeNull();
    });
  });
});
