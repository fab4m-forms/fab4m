import * as React from "react";
import {
  allowedValues,
  createForm,
  disallowedValues,
  integerField,
  max,
  maxLength,
  min,
  minLength,
  textField,
} from "@fab4m/fab4m";
import { FormProvider, allWidgetsRenderer } from "../../src/index";
import { ControlledForm, PageShell } from "../PageShell";

const form = createForm(
  {
    username: textField({
      label: "Username",
      description: "Must be 3-20 characters, no 'admin' or 'moderator'",
      required: true,
      validators: [
        minLength(3),
        maxLength(20),
        disallowedValues(
          ["admin", "moderator", "user"],
          "Username is reserved",
        ),
      ],
    }),
    email: textField({
      label: "Email",
      description: "Enter a valid email address",
      required: true,
    }),
    age: integerField({
      label: "Age",
      description: "Must be between 18 and 120",
      required: true,
      validators: [min(17), max(121)], // Note: min/max validators use > and <, not >= and <=
    }),
    color: textField({
      label: "Favorite Color",
      description: "Pick from: red, blue, green, or yellow",
      required: true,
      validators: [
        allowedValues(
          ["red", "blue", "green", "yellow"],
          "Please choose from the suggested colors",
        ),
      ],
    }),
    password: textField({
      label: "Password",
      description: "Minimum 8 characters",
      required: true,
      validators: [minLength(7)], // Uses > so 7 means min 8
    }),
  },
  {
    title: "Validation Demo",
    description: "Form with various validation rules",
  },
);

export function Validation() {
  return (
    <PageShell
      title="Validation Example"
      description={
        <>
          This example demonstrates various validation rules including length,
          range, allowed values, and more.
        </>
      }
      infoItems={[
        <strong key="admin">Enter "admin" as username (reserved value)</strong>,
        <strong key="age">Enter age below 18 or above 120</strong>,
        <strong key="color">Enter a color not in the list</strong>,
        <strong key="password">
          Enter a password with less than 8 characters
        </strong>,
      ]}
    >
      <FormProvider renderer={allWidgetsRenderer}>
        <ControlledForm form={form} data={{}} />
      </FormProvider>
    </PageShell>
  );
}
