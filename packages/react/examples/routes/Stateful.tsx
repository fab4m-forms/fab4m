import * as React from "react";
import { booleanField, createForm, emailField, textField } from "@fab4m/fab4m";
import { FormProvider, allWidgetsRenderer } from "../../src/index";
import { ThemedStatefulFormView } from "../theme";
import { PageShell, SubmittedView } from "../PageShell";

const form = createForm(
  {
    name: textField({
      label: "Your Name",
      required: true,
    }),
    email: emailField({
      label: "Email Address",
      required: true,
    }),
    rememberMe: booleanField({
      label: "Remember my information",
      description: "Save your details for next time",
      required: false,
    }),
  },
  {
    title: "Quick Contact Form",
    description: "Stateful form that manages its own data",
  },
);

export function Stateful() {
  const [submitted, setSubmitted] = React.useState<Record<
    string,
    unknown
  > | null>(null);
  const [lastChange, setLastChange] = React.useState<string>("");
  // Track data changes.
  form.onDataChange((newData) => {
    setLastChange(JSON.stringify(newData));
  });
  form.onSubmit((e, formData) => {
    e.preventDefault();
    setSubmitted(formData);
  });
  return (
    <PageShell
      title="Stateful Form Example"
      description={
        <>
          The <code>StatefulFormView</code> component manages form state
          internally. It automatically resets after submission and tracks data
          changes.
        </>
      }
      infoTitle="Features:"
      infoItems={[
        <span key="state">Manages its own data state</span>,
        <span key="reset">
          Automatically resets after successful submission
        </span>,
        <span key="change">
          Use <code>form.onDataChange()</code> to react to data changes
        </span>,
        <span key="simple">
          Great for simple forms where you don't need external state management
        </span>,
      ]}
    >
      <div className="live-data">
        <h3>Live Data Changes:</h3>
        <pre>{lastChange || "(no changes yet)"}</pre>
      </div>
      {submitted ? (
        <SubmittedView
          title="Form Submitted!"
          data={submitted}
          resetLabel="Reset (form already cleared itself)"
          onReset={() => {
            setSubmitted(null);
            setLastChange("");
          }}
        />
      ) : (
        <FormProvider renderer={allWidgetsRenderer}>
          <ThemedStatefulFormView form={form} />
        </FormProvider>
      )}
    </PageShell>
  );
}
