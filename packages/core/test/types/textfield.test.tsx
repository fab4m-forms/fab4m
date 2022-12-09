import * as React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import {
  textField,
  textFieldWidget,
  textAreaWidget,
  basic,
  textAreaField,
} from "../../src";
import { inputElementOk } from "../util";
import FormComponentView from "../../src/components/FormComponentView";

describe("text field", () => {
  const textfield = textField({
    name: "textfield",
    label: "Text field",
    required: true,
    widget: textFieldWidget("This is a prefix"),
    validators: [],
  });
  const textarea = textField({
    name: "textarea",
    label: "Text field",
    required: true,
    widget: textAreaWidget(),
    validators: [],
  });

  test("textfield widget and data", async () => {
    let data = "some text";
    const changeData = (value: unknown) => {
      data = value as string;
    };
    const component = () => (
      <FormComponentView
        name="textfield"
        onChange={changeData}
        component={textfield}
        theme={basic}
        value={data}
      />
    );
    const { container, findByText, rerender } = render(component());
    const element = container.querySelector("input");
    if (element) {
      expect(element.value).toBe("some text");
      fireEvent.input(element, {
        value: "some other text",
        target: { value: "some other text" },
      });
      rerender(component());
      await waitFor(async () => {
        expect(data).toBe("some other text");
        expect(element.value).toBe("some other text");
        await findByText("This is a prefix");
      });
    }
  });
  test("textarea widget and data", async () => {
    let data = "some text";
    const changeData = (value: unknown) => {
      data = value as string;
    };
    const component = () => (
      <FormComponentView
        name="textarea"
        onChange={changeData}
        component={textarea}
        theme={basic}
        value={data}
      />
    );
    const { container, rerender } = render(component());
    const element = container.querySelector("textarea");
    if (element) {
      expect(element.value).toBe("some text");
      fireEvent.input(element, {
        value: "some other text",
        target: { value: "some other text" },
      });
      rerender(component());
      await waitFor(() => {
        expect(data).toBe("some other text");
        expect(element.value).toBe("some other text");
      });
    }
  });
  test("textarea field", async () => {
    const textarea = textAreaField({ label: "textarea" });
    const { container } = render(
      <FormComponentView
        onChange={() => {}}
        name="textarea"
        component={textarea}
        theme={basic}
      />
    );
    const element = container.querySelector("textarea");
    expect(element).not.toBe(null);
  });
  inputElementOk(textfield, "textfield:");
  inputElementOk(textarea, "textarea:");
});
