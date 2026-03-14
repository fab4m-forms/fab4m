import * as React from "react";
import { render } from "@testing-library/react";
import { allWidgetsRenderer } from "../../react/src/allwidgets";
import { FormProvider } from "../../react/src/components/FormProvider";

export const renderWithProvider = (ui: JSX.Element) =>
  render(
    <FormProvider renderer={allWidgetsRenderer}>
      {ui}
    </FormProvider>,
  );
