import { createForm, textField, pageBreak } from "fab4m";
import { StatefulFormRoute } from "../../src";
import { Link, Outlet, RouteObject } from "react-router-dom";

const form = createForm({
  text: textField({ label: "First field", required: true }),
  pagebreak: pageBreak(),
  nextText: textField({ label: "Second field" }),
});

const router: RouteObject = {
  path: "/existing-router",
  element: <App />,
  children: [
    {
      path: "form",
      element: (
        <StatefulFormRoute
          useRouteAction={true}
          form={form}
          basePath="/existing-router/form"
        />
      ),
      children: [
        {
          path: ":part",
          element: (
            <StatefulFormRoute
              useRouteAction={true}
              form={form}
              basePath="/existing-router/form"
            />
          ),
        },
      ],
    },
  ],
};

function App() {
  return (
    <div>
      <p>Existing router example</p>
      <Link to="form">Complete the form</Link>
      <Outlet />
    </div>
  );
}

export { router };
