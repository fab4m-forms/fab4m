import * as React from "react";
import { render } from "@testing-library/react";
import { basic, submit } from "../../src";
import FormComponentView from "../../src/components/FormComponentView";

describe("Submit button", () => {
  const field = submit(
    {
      name: "content",
    },
    { title: "Submit button" }
  );
  test("Submit button", async () => {
    const data = {};
    const changeData = () => {
      // No-op.
    };
    const { queryByText } = render(
      <FormComponentView
        name="content"
        theme={basic}
        onChange={changeData}
        component={field}
        value={data}
      />
    );
    expect(queryByText("Submit button")).not.toBe(null);
  });
});
