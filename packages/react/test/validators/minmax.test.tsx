import * as React from "react";

import { StatefulFormView } from "../../src/index";
import { createForm, integerField, min, max } from "@fab4m/fab4m";
import { renderWithProvider } from "../util";


describe("Min/maxvalue validator", () => {
  const form = createForm({
    minValue: integerField({
      label: "Min value",
      validators: [min(5)],
    }),
    maxValue: integerField({
      label: "Max value",
      validators: [max(10)],
    }),
  });
  test("Form validation", async () => {
    const { findByLabelText } = renderWithProvider(<StatefulFormView form={form} />);
    const minInput = await findByLabelText("Min value");
    const maxInput = await findByLabelText("Max value");
    expect((minInput as HTMLInputElement).min).toBe("5");
    expect((maxInput as HTMLInputElement).max).toBe("10");
  });
});
