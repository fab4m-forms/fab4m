import * as React from "react";
import { basic, submit } from "@fab4m/fab4m";
import { FormComponentView } from "../../src/components/FormComponentView";
import { renderWithProvider } from "../util";

describe("Submit button", () => {
  const field = submit(
    {
      name: "content",
    },
    { title: "Submit button" },
  );
  test("Submit button", async () => {
    const data = {};
    const changeData = () => {
      // No-op.
    };
    const { queryByText } = renderWithProvider(
      <FormComponentView
        name="content"
        theme={basic}
        onChange={changeData}
        component={field}
        value={data}
      />,
    );
    expect(queryByText("Submit button")).not.toBe(null);
  });
});
