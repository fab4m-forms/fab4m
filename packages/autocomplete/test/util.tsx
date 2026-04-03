import * as React from "react";
import { render } from "@testing-library/react";
import { allWidgetsRenderer, FormProvider } from "@fab4m/react";
import { Autocomplete } from "../src";

const autocompleteRenderer = {
  ...allWidgetsRenderer,
  widgetComponents: {
    ...allWidgetsRenderer.widgetComponents,
    autocomplete: Autocomplete,
  },
};

export const renderWithProvider = (ui: React.ReactElement) =>
  render(
    <FormProvider renderer={autocompleteRenderer}>
      {ui}
    </FormProvider>,
  );
