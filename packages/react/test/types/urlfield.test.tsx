import * as React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { basic, urlField, FormComponentView, createForm } from "../../src";
import { inputElementOk } from "../util";
import { validate } from "../../src/schemaValidator";

describe("url field", () => {
  const url = urlField({
    name: "url",
    label: "URL",
    required: true,
    validators: [],
  });
  test("url field widget and data", async () => {
    let data = "https://example.com/";
    const changeData = (value: unknown) => {
      data = value as string;
    };
    const component = () => (
      <FormComponentView
        name="url"
        theme={basic}
        onChange={changeData}
        component={url}
        value={data}
      />
    );
    const { findByLabelText, rerender } = render(component());
    const element = (await findByLabelText("URL")) as HTMLInputElement;
    if (element) {
      expect(element.value).toBe("https://example.com/");
      expect(element.type).toBe("url");
      fireEvent.input(element, {
        value: "https://otherexample.com/",
        target: { value: "https://otherexample.com/" },
      });
      await waitFor(() => {
        rerender(component());
        expect(data).toBe("https://otherexample.com/");
        expect(element.value).toBe("https://otherexample.com/");
      });
    }
  });
  test("schema validation", async () => {
    const form = createForm();
    form.add(url);
    const invalid = validate(form, { url: "not-a-url" });
    expect(invalid.valid).toBe(false);
    const valid = validate(form, { url: "https://google.com/" });
    expect(valid.valid).toBe(true);
  });
  inputElementOk(url, "url:");
});
