import * as React from "react";

import { StatefulFormView } from "../../src/index";
import { basic, createForm, group, textField } from "@fab4m/fab4m";
import { content } from "../../src/index";
import { FormComponentView } from "../../src/index";
import { renderWithProvider } from "../util";


describe("Form content", () => {
  const field = content(
    {
      name: "content",
      label: "Some content",
    },
    () => <div>This is some content we put in the form.</div>,
  );
  test("Form content is visible", async () => {
    let data = {};
    const changeData = (value: unknown) => {
      data = value as Record<string, unknown>;
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
    expect(queryByText("This is some content we put in the form.")).not.toBe(
      null,
    );
  });
  test("Form content with data", async () => {
    type FormType = { text: string; content: undefined };
    const form = createForm<FormType>({
      text: textField({
        label: "Text",
      }),
      content: content<FormType>({}, (value) => {
        return <div>{value.text}</div>;
      }),
    });
    const data = { text: "Hello world" };
    const { queryByText } = renderWithProvider(
      <StatefulFormView form={form} data={data} />,
    );
    expect(queryByText("Hello world")).not.toBe(null);
  });

  test("Group content with data", async () => {
    const groupComponent = group(
      { name: "group", label: "Group" },
      {
        text: textField({ label: "Text" }),
        content: content({}, (value) => <div>{value.text as string}</div>),
      },
    );
    const data = { text: "Hello world" };
    const fn = () => {
      // no-op
    };
    const { queryByText } = renderWithProvider(
      <FormComponentView
        theme={basic}
        onChange={fn}
        component={groupComponent}
        name="group"
        value={data}
      />,
    );
    expect(queryByText("Hello world")).not.toBe(null);
  });
});
