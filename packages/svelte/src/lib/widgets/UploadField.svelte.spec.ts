import { describe, it, expect, afterEach } from "vitest";
import { cleanup } from "vitest-browser-svelte";
import { page } from "vitest/browser";
import {
  basic,
  createForm,
  fileField,
  type FormComponentWithName,
} from "@fab4m/fab4m";
import FormComponentView from "../components/FormComponentView.svelte";
import FormView from "../components/FormView.svelte";
import { renderWithProvider } from "../test-utils/renderWithProvider";
import { inputElementOk } from "../test-utils/fieldHelpers";

describe("upload field", () => {
  const field = fileField({
    name: "file",
    label: "A file",
    required: true,
  });

  afterEach(async () => {
    await cleanup();
  });

  it("File field", async () => {
    let changedFile: File | null = null;

    renderWithProvider(FormComponentView, {
      name: "file",
      theme: basic,
      onChange: (value: unknown) => {
        changedFile = value as File;
      },
      component: field,
      value: null,
    });

    const input = page.getByLabelText("A file");
    await expect.element(input).toBeInTheDocument();
    await expect.element(input).toHaveAttribute("type", "file");
  });

  it("enctype on form", async () => {
    const form = createForm();
    form.title = "Upload form";
    form.add(field as FormComponentWithName);
    renderWithProvider(FormView, {
      form,
      data: {},
    });

    const formEl = page.getByRole("form", { name: "Upload form" });
    await expect.element(formEl).toHaveAttribute(
      "enctype",
      "multipart/form-data",
    );
  });

  inputElementOk(field, "file:");
});
