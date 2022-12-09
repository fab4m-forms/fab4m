import * as React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import {
  createForm,
  textField,
  textFieldWidget,
  StatefulFormView,
} from "../src";

describe("Stateful Form", () => {
  interface FormData {
    requiredText: string;
    otherText?: string;
  }
  const form = createForm<FormData>({
    requiredText: textField({
      label: "Required text",
      required: true,
      widget: textFieldWidget(),
      validators: [],
    }),
    otherText: textField({
      label: "Other text field",
      widget: textFieldWidget(),
      required: false,
      validators: [],
    }),
  });
  test("Stateful form rendering", async () => {
    const formSubmit = vi.fn(() => {
      // No-op.
    });
    const { findByLabelText, container } = render(
      <StatefulFormView form={form} />
    );
    const requiredText = (await findByLabelText(
      "Required text"
    )) as HTMLInputElement;
    const otherText = (await findByLabelText(
      "Other text field"
    )) as HTMLInputElement;
    const formElement = container.querySelector("form");
    const submitFn = vi.fn((e: any, data: FormData) => data); // eslint-ignore-line
    form.onSubmit(submitFn);
    form.onAfterSubmit(formSubmit);
    fireEvent.input(requiredText, {
      value: "Required",
      target: { value: "Required" },
    });
    fireEvent.input(otherText, {
      value: "Other",
      target: { value: "Other" },
    });
    await waitFor(() => {
      expect(requiredText.value).toBe("Required");
      expect(otherText.value).toBe("Other");
    });
    if (formElement) {
      fireEvent.submit(formElement);
    }
    await waitFor(() => {
      // After submit should not be called.
      expect(formSubmit.mock.calls.length).toBe(0);
      expect(submitFn.mock.calls.length).toBe(1);
      expect((submitFn.mock.results[0].value as FormData).requiredText).toBe(
        "Required"
      );
      // Values should be left if the form was submitted.
      expect(requiredText.value).toBe("Required");
    });
  });
  test("Form cleanup", async () => {
    const { findByLabelText, container } = render(
      <StatefulFormView form={form} />
    );
    const requiredText = (await findByLabelText(
      "Required text"
    )) as HTMLInputElement;
    const formElement = container.querySelector("form");
    form.onSubmit((e) => {
      e.preventDefault();
    });
    fireEvent.input(requiredText, {
      value: "Required",
      target: { value: "Required" },
    });
    if (formElement) {
      fireEvent.submit(formElement);
    }
    await waitFor(() => {
      expect(requiredText.value).toBe("");
    });
  });
  afterEach(() => {
    form.removeEventListeners();
  });
});
