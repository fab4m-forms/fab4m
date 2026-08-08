import * as React from "react";
import {
  createForm,
  emailField,
  integerField,
  textField,
  textFieldWidget,
} from "@fab4m/fab4m";
import { FormProvider, allWidgetsRenderer } from "../../src/index";
import { ThemedStatefulFormView } from "../theme";
import { PageShell, SubmittedView } from "../PageShell";

const form = createForm(
  {
    name: textField({
      label: "Full Name",
      description: "Enter your full name",
      required: true,
    }),
    email: emailField({
      label: "Email Address",
      description: "We'll never share your email",
      required: true,
    }),
    age: integerField({
      label: "Age",
      description: "Your age in years",
      required: false,
    }),
    bio: textField({
      label: "Biography",
      description: "Tell us about yourself",
      required: false,
      widget: textFieldWidget(),
    }),
  },
  {
    title: "User Profile",
    description: "Create your user profile",
  },
);

export function Simple() {
  const [submitted, setSubmitted] = React.useState<Record<
    string,
    unknown
  > | null>(null);
  form.onSubmit((e, formData) => {
    e.preventDefault();
    setSubmitted(formData);
  });
  return (
    <PageShell
      title="Simple Form Example"
      description={
        <>
          This example demonstrates a basic form with text, email, and number
          fields using the <code>StatefulFormView</code> component.
        </>
      }
    >
      {submitted ? (
        <SubmittedView data={submitted} onReset={() => setSubmitted(null)} />
      ) : (
        <FormProvider renderer={allWidgetsRenderer}>
          <ThemedStatefulFormView form={form} />
        </FormProvider>
      )}
    </PageShell>
  );
}
