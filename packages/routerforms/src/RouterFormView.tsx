import { FormViewProps } from "@fab4m/fab4m";
import * as React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import FormRoute from "./FormRoute";

export interface RouterFormViewProps extends FormViewProps {
  basename?: string;
  completedParts?: number;
  basePath?: string;
}

export default function RouterFormView(
  props: RouterFormViewProps,
): React.JSX.Element {
  return (
    <BrowserRouter basename={props.basename}>
      <Routes>
        <Route path="*" element={<FormRoute {...props} />} />
        <Route path={`/:part`} element={<FormRoute {...props} />} />
        <Route path="/" element={<FormRoute {...props} />} />
      </Routes>
    </BrowserRouter>
  );
}
