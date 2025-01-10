import * as React from "react";
import { StaticRouter } from "react-router-dom/server";
import { Routes, Route } from "react-router-dom";
import FormRoute from "./FormRoute";
import { RouterFormViewProps } from "./RouterFormView";

export function StaticRouterFormView(
  props: RouterFormViewProps & { location: string },
): React.JSX.Element {
  return (
    <StaticRouter basename={props.basename} location={props.location}>
      <Routes>
        <Route path={`/:part`} element={<FormRoute {...props} />} />
        <Route path="/" element={<FormRoute {...props} />} />
      </Routes>
    </StaticRouter>
  );
}
