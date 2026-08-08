import * as React from "react";
import {
  booleanField,
  createForm,
  fieldsetWidget,
  group,
  horizontalGroupWidget,
  integerField,
  selectWidget,
  textField,
} from "@fab4m/fab4m";
import { FormProvider, allWidgetsRenderer } from "../../src/index";
import { ControlledForm, PageShell } from "../PageShell";

const form = createForm(
  {
    // Basic group with nested fields
    personalInfo: group(
      {
        label: "Personal Information",
        description: "Your basic details",
      },
      {
        firstName: textField({
          label: "First Name",
          required: true,
        }),
        lastName: textField({
          label: "Last Name",
          required: true,
        }),
      },
    ),

    // Group with fieldset widget for visual grouping
    address: group(
      {
        label: "Address",
        description: "Where can we reach you?",
        widget: fieldsetWidget(),
      },
      {
        street: textField({
          label: "Street Address",
          required: true,
        }),
        city: textField({
          label: "City",
          required: true,
        }),
        zipCode: textField({
          label: "ZIP / Postal Code",
          required: true,
        }),
        country: textField({
          label: "Country",
          required: true,
          widget: selectWidget([
            ["United States", "US"],
            ["Canada", "CA"],
            ["United Kingdom", "UK"],
            ["Germany", "DE"],
            ["France", "FR"],
            ["Other", "other"],
          ]),
        }),
      },
    ),

    // Horizontal group for inline fields
    emergencyContact: group(
      {
        label: "Emergency Contact",
        widget: horizontalGroupWidget(),
      },
      {
        contactName: textField({
          label: "Name",
          required: false,
        }),
        contactPhone: textField({
          label: "Phone",
          required: false,
        }),
      },
    ),

    // Nested group - group inside another group
    employment: group(
      {
        label: "Employment Details",
        widget: fieldsetWidget(),
      },
      {
        company: textField({
          label: "Company Name",
          required: false,
        }),
        jobDetails: group(
          {
            label: "Job Details",
          },
          {
            title: textField({
              label: "Job Title",
              required: false,
            }),
            department: textField({
              label: "Department",
              required: false,
            }),
            yearsEmployed: integerField({
              label: "Years at Company",
              required: false,
            }),
          },
        ),
      },
    ),

    // Boolean field for preferences
    subscribeNewsletter: booleanField({
      label: "Subscribe to newsletter",
      description: "Receive updates about our products",
      required: false,
    }),
  },
  {
    title: "Group Fields Demo",
    description: "Organized form with nested field groups",
  },
);

export function Group() {
  return (
    <PageShell
      title="Group Fields Example"
      description={
        <>
          This form demonstrates how to organize fields into logical groups.
          Groups can be nested and styled differently.
        </>
      }
      infoTitle="Group Types Shown:"
      infoItems={[
        <strong key="basic">
          Basic Group - Simple container for related fields
        </strong>,
        <strong key="fieldset">
          Fieldset Group - Visual grouping with a border
        </strong>,
        <strong key="horizontal">
          Horizontal Group - Fields displayed inline
        </strong>,
        <strong key="nested">Nested Groups - Groups within groups</strong>,
      ]}
    >
      <FormProvider renderer={allWidgetsRenderer}>
        <ControlledForm form={form} data={{}} />
      </FormProvider>
    </PageShell>
  );
}
