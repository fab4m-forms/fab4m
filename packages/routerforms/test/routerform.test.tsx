import "@testing-library/jest-dom";
import "cross-fetch/polyfill";
import { createForm, textField, pageBreak, content, Form } from "@fab4m/fab4m";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { FormRouteProps, StatefulFormRoute, RouterFormView } from "../src";
import { vi } from "vitest";
import * as React from "react";
import {
  ActionFunction,
  createMemoryRouter,
  RouterProvider,
  useActionData,
} from "react-router-dom";

describe("Routed form", () => {
  const createTestForm = () => {
    const form = createForm({});
    form.add(textField({ name: "first", label: "Before page break" }));
    form.add(pageBreak({ label: "First break", name: "first_break" }));
    form.add(
      textField({
        name: "second",
        label: "After page break",
      }),
    );
    return form;
  };

  const MemoryRouterFormView = (
    props: Omit<FormRouteProps, "form" | "data"> & {
      path: string;
      form: Form;
    },
  ) => {
    const { path, ...rest } = props;
    const router = createMemoryRouter(
      [
        {
          path: `/:part`,
          element: <StatefulFormRoute basename="" {...rest} />,
        },
        {
          path: `/`,
          element: <StatefulFormRoute basename="" {...rest} />,
        },
      ],
      {
        initialEntries: [path],
      },
    );
    return <RouterProvider router={router} />;
  };

  it("Router form", async () => {
    const form = createTestForm();
    const screen = render(<MemoryRouterFormView path="/" form={form} />);
    expect(await screen.findByLabelText("Before page break")).toBeVisible();
    expect(screen.queryByLabelText("After page break")).toBeNull();
    expect(screen.queryByText("Previous")).toBeNull();
    const next = await screen.findByText("Next");
    fireEvent.click(next);
    await waitFor(async () => {
      expect(await screen.findByLabelText("After page break")).toBeVisible();
    });
    const prev = await screen.findByText("Previous");
    fireEvent.click(prev);
    await waitFor(async () => {
      expect(await screen.findByLabelText("Before page break")).toBeVisible();
    });
  });

  it("Invalid page should redirect to first page", async () => {
    const form = createTestForm();
    const { findByLabelText, queryByText } = render(
      <MemoryRouterFormView form={form} path="/2" />,
    );
    expect(queryByText("Previous")).toBeNull();
    expect(await findByLabelText("Before page break")).toBeVisible();
  });

  it("Don't allow viewing a page when we haven't completed the previos page", async () => {
    const form = createTestForm();
    const { findByLabelText, queryByText } = render(
      <MemoryRouterFormView form={form} path="/1" />,
    );
    expect(queryByText("Previous")).toBeNull();
    expect(await findByLabelText("Before page break")).toBeVisible();
  });

  it("Allow viewing page 2 when explicitly allowed", async () => {
    const form = createTestForm();
    const { findByLabelText, findByText } = render(
      <MemoryRouterFormView completedParts={1} form={form} path="/1" />,
    );
    expect(await findByText("Previous")).toBeVisible();
    expect(await findByLabelText("After page break")).toBeVisible();
  });

  it("Form route action", async () => {
    const form = createTestForm();
    let submitRequest: Request | null = null;
    const action: ActionFunction = async ({ request }) => {
      submitRequest = request;
      return "done";
    };
    const spy = vi.fn().mockImplementation(action);
    const FormComponent = () => {
      const action = useActionData();
      if (action) {
        return <div>All done</div>;
      }
      return <StatefulFormRoute useRouteAction={true} form={form} />;
    };

    const router = createMemoryRouter(
      [
        {
          path: "/:part",
          action: spy,
          element: <FormComponent />,
        },
        {
          path: "*",
          action: spy,
          element: <FormComponent />,
        },
      ],
      { initialEntries: ["/0"] },
    );
    const { findByText, findByLabelText, getByText } = render(
      <RouterProvider router={router} />,
    );
    fireEvent.input(await findByLabelText("Before page break"), {
      target: { value: "A text" },
    });
    fireEvent.click(await findByText("Next"));
    fireEvent.input(await findByLabelText("After page break"), {
      target: { value: "Another text" },
    });

    fireEvent.click(await findByText("Complete"));
    await waitFor(async () => {
      expect(getByText("All done")).toBeDefined();
    });
    expect(spy).toHaveBeenCalled();

    if (submitRequest) {
      const formData = await submitRequest.formData();
      expect(formData.get("first")).toBe("A text");
      expect(formData.get("second")).toBe("Another text");
    }
  });

  it("Route form with form context", async () => {
    const formWithRouteContext = createForm({
      text: textField({
        label: "text",
      }),
      content: content<{ text: string }>({}, (data) => (
        <div data-testid="content">{data.text}</div>
      )),
    });
    const { findByTestId } = render(
      <RouterFormView
        form={formWithRouteContext}
        data={{ text: "This is a text" }}
      />,
    );
    expect(await findByTestId("content")).toContainHTML("This is a text");
  });
});
