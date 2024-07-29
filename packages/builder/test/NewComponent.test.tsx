import "@testing-library/jest-dom";
import { createForm, serialize } from "@fab4m/fab4m";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { FormBuilderProvider, FormComponents, allPlugins } from "../src";
import * as React from "react";
import { NewComponent } from "../src/components/NewComponent";

describe("New component gallery", () => {
  const form = serialize(createForm({}));
  it("Select component", async () => {
    const Component = () => {
      const [draft, changeDraft] = React.useState(form);
      return (
        <FormBuilderProvider
          plugins={allPlugins}
          form={draft}
          formChanged={changeDraft}
        >
          <FormComponents />
          <NewComponent
            attributes={{
              name: `component_${draft.components.length}`,
              label: `Component ${draft.components.length + 1}`,
            }}
          />
        </FormBuilderProvider>
      );
    };
    render(<Component />);
    expect(screen.queryByText("Text field")).toBeVisible();
    fireEvent.click(screen.getByText("Text field"));
    await waitFor(() => {
      expect(screen.queryByText("Component 1")).toBeVisible();
    });
    fireEvent.click(screen.getByText("Text field"));
    await waitFor(() => {
      expect(screen.queryByText("Component 2")).toBeVisible();
    });
  });
});
