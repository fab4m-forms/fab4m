import * as React from "react";
import { fireEvent, waitFor } from "@testing-library/react";
import { basic, urlField, createForm } from "@fab4m/fab4m";
import { inputElementOk, renderWithProvider } from "../util";
import { FormComponentView } from "../../src/index";
import { FormProvider } from "../../src/index";
import { allWidgetsRenderer } from "../../src/index";

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
    const { findByLabelText, rerender } = renderWithProvider(component());
    const element = (await findByLabelText("URL")) as HTMLInputElement;
    if (element) {
      expect(element.value).toBe("https://example.com/");
      expect(element.type).toBe("url");
      fireEvent.input(element, {
        value: "https://otherexample.com/",
        target: { value: "https://otherexample.com/" },
      });
      await waitFor(() => {
        rerender(
          <FormProvider renderer={allWidgetsRenderer}>{component()}</FormProvider>,
        );
        expect(data).toBe("https://otherexample.com/");
        expect(element.value).toBe("https://otherexample.com/");
      });
    }
  });
  /*
  test("schema validation", async () => {
    const form = createForm();
    form.add(url);
    const invalid = validate(form, { url: "not-a-url" });
    expect(invalid.valid).toBe(false);
    const valid = validate(form, { url: "https://google.com/" });
    expect(valid.valid).toBe(true);
  });*/
  inputElementOk(url, "url:");
});
