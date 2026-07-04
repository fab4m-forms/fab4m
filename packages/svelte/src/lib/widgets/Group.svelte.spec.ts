import { describe, it, expect, afterEach } from "vitest";
import { cleanup } from "vitest-browser-svelte";
import { page } from "vitest/browser";
import {
  textField,
  group,
  createForm,
  fieldsetWidget,
  equals,
  allowedValues,
  detailsWidget,
} from "@fab4m/fab4m";
import FormView from "../components/FormView.svelte";
import StatefulFormView from "../components/StatefulFormView.svelte";
import { renderWithProvider } from "../test-utils/renderWithProvider";

describe("groups", () => {
  const field1 = textField({
    name: "field1",
    label: "Text field 1",
    required: true,
  });
  const field2 = textField({
    name: "field2",
    label: "Text field 2",
    required: true,
  });
  const multiple = textField({
    name: "multiple",
    label: "Multiple text",
    multiple: true,
  });

  const groupItem = group(
    { name: "group", label: "Group with fields" },
    { field1, field2, multiple },
  );

  const groupForm = createForm({
    group: groupItem,
  });

  const data = {
    group: {
      field1: "Text",
      field2: "Other text",
      multiple: ["test", "test2", "test3"],
    },
  };

  afterEach(async () => {
    await cleanup();
  });

  it("grouped items", async () => {
    renderWithProvider(FormView, {
      form: groupForm,
      data,
    });

    const el1 = page.getByLabelText("Text field 1");
    const el2 = page.getByLabelText("Text field 2");
    const multipleField = page.getByLabelText("Multiple text").first();

    await expect.element(el1).toHaveValue("Text");
    await expect.element(el2).toHaveValue("Other text");
    await expect.element(el1).toHaveAttribute("name", "group[field1]");
    await expect.element(el2).toHaveAttribute("name", "group[field2]");
    await expect.element(el1).toHaveAttribute("id", "group_field1");
    await expect.element(el2).toHaveAttribute("id", "group_field2");
    await expect.element(multipleField).toHaveAttribute(
      "name",
      "group[multiple][0]",
    );
  });

  it("fieldset widget", async () => {
    const fsForm = createForm({
      group: group(
        {
          name: "group",
          label: "Group with fields",
          widget: fieldsetWidget(),
        },
        { field1, field2 },
      ),
    });

    renderWithProvider(FormView, {
      form: fsForm,
      data: {
        group: {
          field1: "Text",
          field2: "Other text",
        },
      },
    });

    await expect
      .element(page.getByText("Group with fields"))
      .toBeInTheDocument();
    const el1 = page.getByLabelText("Text field 1");
    const el2 = page.getByLabelText("Text field 2");
    await expect.element(el1).toHaveValue("Text");
    await expect.element(el2).toHaveValue("Other text");
  });

  it.skip("Rules in grouped components", async () => {
    const form = createForm();
    form.add(
      textField({
        name: "outside_group",
        label: "Outside group",
      }),
    );
    form.add(
      group({ name: "group", label: "group" }, [
        textField({
          name: "inside_group",
          label: "Inside group",
          rules: [["outside_group", equals("outside")]],
        }),
      ]),
    );

    renderWithProvider(StatefulFormView, {
      form,
    });

    await expect
      .element(page.getByLabelText("Inside group"))
      .not.toBeInTheDocument();

    const outside = page.getByLabelText("Outside group");
    await outside.fill("outside");

    await expect
      .element(page.getByLabelText("Inside group"))
      .toBeInTheDocument();
  });

  it("Validators in grouped components", async () => {
    const form = createForm();
    form.add(
      group({ name: "group", label: "group" }, [
        textField({
          name: "inside_group",
          label: "Inside group",
          validators: [allowedValues(["inside"], "Not allowed")],
        }),
      ]),
    );

    renderWithProvider(StatefulFormView, {
      form,
    });

    const field = page.getByLabelText("Inside group");
    await field.fill("not inside");

    await expect.element(field).toHaveValue("not inside");

    const submit = page.getByRole("button", { name: "Save" });
    await submit.click();

    await expect.element(page.getByText("Not allowed")).toBeInTheDocument();
  });

  it("Details widget", async () => {
    const detailsW = detailsWidget();
    const detailsForm = createForm({
      group: group(
        {
          label: "Details label",
          widget: detailsW,
        },
        { field1, field2 },
      ),
    });

    renderWithProvider(StatefulFormView, {
      form: detailsForm,
    });

    await expect.element(page.getByText("Details label")).toBeInTheDocument();
    await expect
      .element(page.getByLabelText("Text field 1"))
      .not.toBeVisible();
    await expect
      .element(page.getByLabelText("Text field 2"))
      .not.toBeVisible();
  });

  it("Details widget with open content", async () => {
    const detailsW = detailsWidget({ open: true });
    const detailsForm = createForm({
      group: group(
        {
          label: "Details label",
          widget: detailsW,
        },
        { field1, field2 },
      ),
    });

    renderWithProvider(StatefulFormView, {
      form: detailsForm,
      data: { group: { field1: "Value" } },
    });

    await expect
      .element(page.getByLabelText("Text field 1"))
      .toBeVisible();
    await expect
      .element(page.getByLabelText("Text field 2"))
      .toBeVisible();
  });
});