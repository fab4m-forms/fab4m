import * as React from "react";
import {
  booleanField,
  checkboxWidget,
  createForm,
  dateField,
  dateRangeField,
  dateTimeField,
  detailsWidget,
  fileField,
  floatField,
  group,
  hiddenFieldWidget,
  integerField,
  passwordField,
  passwordVerifyField,
  radiosWidget,
  selectWidget,
  submit,
  tableWidget,
  tagsWidget,
  textAreaField,
  textField,
} from "@fab4m/fab4m";
import { FormProvider, allWidgetsRenderer, content } from "../../src/index";
import { ControlledForm, PageShell } from "../PageShell";

const form = createForm(
  {
    // Basic input widgets
    text: textField({
      label: "Text field",
      description: "The default text field widget",
      required: true,
    }),
    textarea: textAreaField({
      label: "Text area",
      description: "Multi-line text input",
    }),
    number: integerField({
      label: "Integer number",
      description: "Whole numbers only",
    }),
    float: floatField({
      label: "Float number",
      description: "Numbers with decimals",
    }),

    // Choice widgets
    select: textField({
      label: "Select",
      description: "Dropdown with options",
      widget: selectWidget([
        ["Option one", "one"],
        ["Option two", "two"],
        ["Option three", "three"],
      ]),
    }),
    radios: textField({
      label: "Radios",
      description: "Radio button options",
      widget: radiosWidget([
        ["Option one", "one"],
        ["Option two", "two"],
      ]),
    }),
    checkbox: booleanField({
      label: "Checkbox",
      description: "A boolean checkbox",
      widget: checkboxWidget(),
    }),

    // Date widgets
    date: dateField({
      label: "Date",
      description: "Pick a single date",
    }),
    dateTime: dateTimeField({
      label: "Date time",
      description: "Pick a date and time",
    }),
    dateRange: dateRangeField({
      label: "Date range",
      description: "Pick a range of dates",
    }),

    // Password widgets
    password: passwordField({
      label: "Password",
      description: "Hidden text input",
    }),
    passwordVerify: passwordVerifyField({
      label: "Password verify",
      description: "Must match the password above",
    }),

    // Special widgets
    file: fileField({
      label: "File upload",
      description: "Upload a file",
    }),
    hidden: textField({
      label: "Hidden field",
      description: "This field is not visible",
      widget: hiddenFieldWidget(),
    }),
    content: content(
      {
        label: "Content",
      },
      () => (
        <div className="content-block">
          This is <strong>custom content</strong> rendered inside the form.
        </div>
      ),
    ),

    // Groups with different widgets
    details: group(
      {
        label: "Details group",
        description: "Fields hidden behind a details element",
        widget: detailsWidget({ summary: "Click to expand" }),
      },
      {
        detailsField: textField({ label: "Field in details" }),
      },
    ),

    // Multiple value widgets
    tags: textField({
      label: "Tags",
      description: "Add multiple values as tags",
      multiple: true,
      multipleWidget: tagsWidget({ addItemLabel: "Add tag" }),
    }),
    table: group(
      {
        label: "Table",
        description: "Multiple items in a table",
        multiple: true,
        multipleWidget: tableWidget(),
      },
      {
        first: textField({ label: "First" }),
        second: textField({ label: "Second" }),
      },
    ),

    customSubmit: submit(
      { name: "custom_submit" },
      { title: "Custom submit button" },
    ),
  },
  {
    title: "Widgets Demo",
    description: "All built-in widgets rendered side by side",
  },
);

export function Widgets() {
  return (
    <PageShell
      title="Widgets Example"
      description={
        <>
          This example renders every widget shipped with{" "}
          <code>allWidgetsRenderer</code> in a single form, so you can compare
          them side by side.
        </>
      }
      infoTitle="Widgets shown:"
      infoItems={[
        <span key="text">Text, textarea, number and float fields</span>,
        <span key="choices">Select, radios and checkbox widgets</span>,
        <span key="dates">Date, date time and date range pickers</span>,
        <span key="password">Password and password verify fields</span>,
        <span key="multiple">
          File upload, hidden, content and multiple widgets
        </span>,
        <span key="groups">
          Fieldset, horizontal, details and table groups
        </span>,
      ]}
    >
      <FormProvider renderer={allWidgetsRenderer}>
        <ControlledForm form={form} data={{ hidden: "secret-value" }} />
      </FormProvider>
    </PageShell>
  );
}
