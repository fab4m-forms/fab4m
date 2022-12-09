import "./App.css";
import BasicRouter from "./BasicRouter";
import StatefulRouter from "./StatefulRouter";
import "../../../core/css/basic/basic.css";
import { route } from "./RouterForm";
import "./App.css";
import { router as existingRouter } from "./ExistingRouter";
import {
  createBrowserRouter,
  Link,
  Outlet,
  RouterProvider,
} from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Base />,
      children: [
        {
          path: "/basic-example/:part",
          element: <BasicRouter />,
        },
        {
          path: "/stateful-example/:part",
          element: <StatefulRouter />,
        },
        route,
        existingRouter,
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

function Base() {
  return (
    <div className="App">
      <ul>
        <li>
          <Link to="basic-example/0">Basic router</Link>
        </li>
        <li>
          <Link to="stateful-example/0">Router with internal state</Link>
        </li>
        <li>
          <Link to="route-forms/0">Route forms</Link>
        </li>
        <li>
          <Link to="/existing-router">Existing router</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}

export default App;
