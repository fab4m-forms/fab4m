import { describe, it, expect, afterEach, vi } from "vitest";
import { cleanup } from "vitest-browser-svelte";
import { page } from "vitest/browser";
import {
  createForm,
  textField,
  textFieldWidget,
  fileField,
  group,
  type ValidationError,
} from "@fab4m/fab4m";
import FormView from "./FormView.svelte";
import { renderWithProvider } from "../test-utils/renderWithProvider.js";

describe("Form", () => {
  const form = createForm(
    {},
    {
      labels: { submit: "Save this form", required: "Required text" },
      description: "description",
      title: "title",
    },
  );
  form.add(
    textField({
      name: "required_text",
      label: "Required text",
      required: true,
      widget: textFieldWidget(),
      validators: [],
    }),
  );
  form.add(
    textField({
      name: "other_text",
      label: "Other text field",
      widget: textFieldWidget(),
      required: false,
      validators: [],
    }),
  );
  form.add(
    textField({
      name: "multiple",
      label: "Multiple field",
      required: true,
      multiple: true,
      minItems: 2,
      maxItems: 3,
    }),
  );
  form.add(
    fileField({
      name: "field_without_schema",
      label: "field without schema",
      required: true,
    }),
  );
  form.add(
    group(
      { name: "group", label: "Group" },
      {
        required_group_text_field: textField({
          name: "required_group_text_field",
          label: "Required group text field",
          required: true,
        }),
        group_field_without_schema: fileField({
          label: "Group field without schema",
          required: true,
        }),
      },
    ),
  );

  afterEach(async () => {
    await cleanup();
  });

  it("Form rendering", async () => {
    renderWithProvider(FormView, {
      form,
      data: {},
      className: "custom-form-class",
    });

    await expect
      .element(page.getByRole("button", { name: "Save this form" }))
      .toBeInTheDocument();
    await expect
      .element(page.getByLabelText("Required text"))
      .toBeInTheDocument();
    await expect
      .element(page.getByLabelText("Other text field"))
      .toBeInTheDocument();
  });

  it("Disabled submit", async () => {
    renderWithProvider(FormView, {
      form,
      data: {},
      disabled: true,
    });

    const submit = page.getByRole("button", { name: "Save this form" });
    await expect.element(submit).toBeDisabled();
  });

  it("Form validation", async () => {
    const validationForm = createForm({
      required_text: textField({
        name: "required_text",
        label: "Required text",
        required: true,
        widget: textFieldWidget(),
        validators: [],
      }),
      other_text: textField({
        name: "other_text",
        label: "Other text field",
        widget: textFieldWidget(),
      }),
      multiple: textField({
        name: "multiple",
        label: "Multiple field",
        required: true,
        multiple: true,
        minItems: 2,
        maxItems: 3,
      }),
    });

    const data: Record<string, unknown> = {
      required_text: "text",
      other_text: "text",
      multiple: ["one"],
    };

    renderWithProvider(FormView, {
      form: validationForm,
      data,
    });

    await expect
      .element(page.getByRole("button", { name: "Save" }))
      .toBeInTheDocument();

    const submit = page.getByRole("button", { name: "Save" });
    await submit.click();

    await expect
      .element(page.getByText("Multiple field must have at least 2 items."))
      .toBeInTheDocument();
  });

  it("Form custom errors", async () => {
    const errors: ValidationError[] = [
      { path: "/required_text", message: "This is a custom error" },
    ];

    renderWithProvider(FormView, {
      form,
      data: { required_text: "hello" },
      errors,
    });

    await expect
      .element(page.getByText("This is a custom error"))
      .toBeInTheDocument();
  });

  it("No form error classes if no errors are present", async () => {
    renderWithProvider(FormView, {
      form,
      data: { required_text: "hello" },
    });

    await expect
      .element(page.getByRole("button", { name: "Save this form" }))
      .toBeInTheDocument();
  });

  it("Hide submit", async () => {
    renderWithProvider(FormView, {
      form,
      data: { required_text: "hello" },
      hideSubmit: true,
    });

    await expect
      .element(page.getByRole("button", { name: "Save this form" }))
      .not.toBeInTheDocument();
  });

  it("ID Prefix", async () => {
    renderWithProvider(FormView, {
      form,
      data: { required_text: "hello" },
      idPrefix: "prefix_",
    });

    const label = page.getByLabelText("Required text");
    await expect.element(label).toHaveAttribute("id", "prefix_required_text");
  });

  it("Extra info", async () => {
    renderWithProvider(FormView, {
      form,
      data: {},
      extra: { test: "test", test2: 1 },
    });

    await expect
      .element(page.getByLabelText("Required text"))
      .toBeInTheDocument();
  });

  it("Event handlers", async () => {
    const first = vi.fn();
    const second = vi.fn();
    const eventForm = createForm({
      text: textField({
        name: "text",
        label: "text",
      }),
    });
    eventForm.onSubmit(first);
    eventForm.onSubmit(second);

    renderWithProvider(FormView, {
      form: eventForm,
      data: {},
    });

    const submit = page.getByRole("button", { name: "Save" });
    await submit.click();

    expect(second).toHaveBeenCalled();
    expect(first).not.toHaveBeenCalled();
  });
});
