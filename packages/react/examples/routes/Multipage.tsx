import * as React from "react";
import {
  createForm,
  emailField,
  integerField,
  pageBreak,
  textField,
} from "@fab4m/fab4m";
import { FormProvider, allWidgetsRenderer } from "../../src/index";
import { ThemedStatefulFormView } from "../theme";
import { PageShell, SubmittedView } from "../PageShell";

const form = createForm(
  {
    // Page 1: Personal Info
    firstName: textField({
      label: "First Name",
      required: true,
    }),
    lastName: textField({
      label: "Last Name",
      required: true,
    }),
    pageBreak1: pageBreak({ label: "Personal to Contact" }),

    // Page 2: Contact Info
    email: emailField({
      label: "Email Address",
      required: true,
    }),
    phone: textField({
      label: "Phone Number",
      required: false,
    }),
    pageBreak2: pageBreak({ label: "Contact to Preferences" }),

    // Page 3: Preferences
    age: integerField({
      label: "Age",
      required: false,
    }),
    interests: textField({
      label: "Interests",
      description: "What are you interested in?",
      required: false,
    }),
  },
  {
    title: "Multi-step Registration",
    description: "Complete your profile in 3 easy steps",
    labels: {
      next: "Continue →",
      previous: "← Go Back",
      complete: "Complete Registration",
      submit: "Submit",
      required: "Required",
    },
  },
);

export function Multipage() {
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
      title="Multipage Form Example"
      description={
        <>
          This form is split across multiple pages using page breaks. Navigate
          using the Previous/Next buttons.
        </>
      }
    >
      {submitted ? (
        <SubmittedView
          title="🎉 Registration Complete!"
          data={submitted}
          resetLabel="Start Over"
          onReset={() => setSubmitted(null)}
        />
      ) : (
        <FormProvider renderer={allWidgetsRenderer}>
          <ThemedStatefulFormView form={form} />
        </FormProvider>
      )}
    </PageShell>
  );
}
