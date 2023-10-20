import "@testing-library/jest-dom";
import "cross-fetch/polyfill";
import { createForm, textField, pageBreak, content } from "@fab4m/fab4m";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import {
  FormRouteProps,
  FormRoute,
  StatefulFormRoute,
  RouterFormView,
} from "../src";
import { vi } from "vitest";
import * as React from "react";
import {
  ActionFunction,
  createMemoryRouter,
  MemoryRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
describe("Routed form", () => {
  const MemoryRouterFormView = (props: FormRouteProps & { path: string }) => (
    <MemoryRouter initialEntries={[props.path]}>
      <Routes>
        <Route
          path={`/:part`}
          element={<FormRoute basename="" {...props} />}
        ></Route>
        <Route
          path={`/`}
          element={<FormRoute basename="" {...props} />}
        ></Route>
      </Routes>
    </MemoryRouter>
  );
  const form = createForm({});
  form.add(textField({ name: "first", label: "Before page break" }));
  form.add(pageBreak({ label: "First break", name: "first_break" }));
  form.add(
    textField({
      name: "second",
      label: "After page break",
    }),
  );
  let data = {};
  form.onComponentChange((property, value) => {
    data = { ...data, [property]: value };
  });
  it("Router form", async () => {
    const screen = render(
      <MemoryRouterFormView path="/" form={form} data={data} />,
    );
    expect(screen.queryByText("Before page break")).toBeVisible();
    expect(screen.queryByLabelText("After page break")).toBeNull();
    expect(screen.queryByText("Previous")).toBeNull();
    const next = await screen.findByText("Next");
    fireEvent.click(next);
    await waitFor(async () => {
      expect(screen.queryByLabelText("After page break")).toBeVisible();
    });
    const prev = await screen.findByText("Previous");
    fireEvent.click(prev);
    await waitFor(async () => {
      expect(screen.queryByLabelText("Before page break")).toBeVisible();
    });
  });
  it("Invalid page should redirect to first page", () => {
    const { queryByText, queryByLabelText } = render(
      <MemoryRouterFormView form={form} path="/2" data={data} />,
    );
    expect(queryByText("Previous")).toBeNull();
    expect(queryByLabelText("Before page break")).toBeVisible();
  });
  it("Don't allow viewing a page when we haven't completed the previos page", () => {
    const { queryByText, queryByLabelText } = render(
      <MemoryRouterFormView form={form} path="/1" data={data} />,
    );
    expect(queryByText("Previous")).toBeNull();
    expect(queryByLabelText("Before page break")).toBeVisible();
  });
  it("Allow viewing page 2 when explicitly allowed", () => {
    const { queryByText, queryByLabelText } = render(
      <MemoryRouterFormView
        completedParts={1}
        form={form}
        path="/1"
        data={data}
      />,
    );
    expect(queryByText("Previous")).toBeVisible();
    expect(queryByLabelText("After page break")).toBeVisible();
  });
  it("Form route action", async () => {
    let submitRequest: Request | null = null;
    const action: ActionFunction = async ({ request }) => {
      submitRequest = request;
    };
    const spy = vi.fn().mockImplementation(action);
    function Route() {
      const router = createMemoryRouter(
        [
          {
            path: "/:part",
            action: spy,
            element: <StatefulFormRoute useRouteAction={true} form={form} />,
          },
          {
            path: "*",
            element: <StatefulFormRoute useRouteAction={true} form={form} />,
          },
        ],
        { initialEntries: ["/0"] },
      );
      return <RouterProvider router={router} />;
    }

    const { findByText, findByLabelText } = render(<Route />);
    fireEvent.input(await findByLabelText("Before page break"), {
      value: "A text",
      target: { value: "A text" },
    });
    fireEvent.click(await findByText("Next"));
    fireEvent.input(await findByLabelText("After page break"), {
      value: "Another text",
      target: { value: "Another text" },
    });

    fireEvent.click(await findByText("Complete"));
    await act(async () => {
      await waitFor(async () => {
        expect(spy).toHaveBeenCalled();
      });
      // Nasty workaround for the fact that we don't have formdata.
      if (submitRequest) {
        const buffer = await submitRequest.arrayBuffer();
        const decoder = new TextDecoder();
        const data = new URLSearchParams(decoder.decode(buffer));
        expect(data.get("first")).toBe("A text");
        expect(data.get("second")).toBe("Another text");
      }
    });
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
