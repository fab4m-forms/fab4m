import * as React from "react";
import { render } from "@testing-library/react";
import {
  basic,
  content,
  createForm,
  group,
  StatefulFormView,
  textField,
} from "../../src";
import FormComponentView from "../../src/components/FormComponentView";

describe("Form content", () => {
  const field = content(
    {
      name: "content",
      label: "Some content",
    },
    () => <div>This is some content we put in the form.</div>
  );
  test("Form content is visible", async () => {
    let data = {};
    const changeData = (value: unknown) => {
      data = value as Record<string, unknown>;
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
    expect(queryByText("This is some content we put in the form.")).not.toBe(
      null
    );
  });
  test("Form content with data", async () => {
    const form = createForm({
      text: textField({
        label: "Text",
      }),
      content: content<{ text?: string }>({}, (value) => {
        return <div>{value.text}</div>;
      }),
    });
    const data = { text: "Hello world" };
    const { queryByText } = render(
      <StatefulFormView form={form} data={data} />
    );
    expect(queryByText("Hello world")).not.toBe(null);
  });

  test("Group content with data", async () => {
    const groupComponent = group(
      { name: "group", label: "Group" },
      {
        text: textField({ label: "Text" }),
        content: content({}, (value) => <div>{value.text as string}</div>),
      }
    );
    const data = { text: "Hello world" };
    const fn = () => {
      // no-op
    };
    const { queryByText } = render(
      <FormComponentView
        theme={basic}
        onChange={fn}
        component={groupComponent}
        name="group"
        value={data}
      />
    );
    expect(queryByText("Hello world")).not.toBe(null);
  });
});
