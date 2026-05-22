import { describe, it, expect, afterEach } from "vitest";
import { cleanup } from "vitest-browser-svelte";
import { page } from "vitest/browser";
import {
  textField,
  textFieldWidget,
  textAreaWidget,
  basic,
  textAreaField,
} from "@fab4m/fab4m";
import FormComponentView from "../components/FormComponentView.svelte";
import { renderWithProvider } from "../test-utils/renderWithProvider";
import { inputElementOk } from "../test-utils/fieldHelpers";

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

  afterEach(async () => {
    await cleanup();
  });

  it("renders textfield widget and accepts data changes", async () => {
    let data = "some text";

    renderWithProvider(FormComponentView, {
      name: "textfield",
      onChange: (value: unknown) => {
        data = value as string;
      },
      component: textfield,
      theme: basic,
      value: data,
    });

    const input = page.getByLabelText("Text field");
    await expect.element(input).toHaveValue("some text");
    await expect.element(page.getByText("This is a prefix")).toBeInTheDocument();

    await input.fill("some other text");
    expect(data).toBe("some other text");
  });

  it("renders textarea widget and accepts data changes", async () => {
    let data = "some text";

    renderWithProvider(FormComponentView, {
      name: "textarea",
      onChange: (value: unknown) => {
        data = value as string;
      },
      component: textarea,
      theme: basic,
      value: data,
    });

    const textareaEl = page.getByRole("textbox");
    await expect.element(textareaEl).toHaveValue("some text");

    await textareaEl.fill("some other text");
    expect(data).toBe("some other text");
  });

  it("renders textarea field", async () => {
    const ta = textAreaField({ label: "textarea" });

    renderWithProvider(FormComponentView, {
      name: "textarea",
      onChange: () => {},
      component: ta,
      theme: basic,
    });

    const textareaEl = page.getByRole("textbox");
    await expect.element(textareaEl).toBeInTheDocument();
  });

  inputElementOk(textfield, "textfield:");
  inputElementOk(textarea, "textarea:");
});