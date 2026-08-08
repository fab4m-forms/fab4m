import * as React from "react";
import { Form } from "@fab4m/fab4m";
import { ThemedFormView } from "./theme";

/**
 * Shared page chrome used by all example routes. Mirrors the layout
 * of the svelte package testbed (title, description, info box).
 */
export function PageShell(props: {
  title: string;
  description: React.ReactNode;
  infoTitle?: string;
  infoItems?: React.ReactNode[];
  children: React.ReactNode;
}) {
  return (
    <div className="example-page">
      <h1>{props.title}</h1>
      <p className="page-description">{props.description}</p>
      {props.infoItems && props.infoItems.length > 0 ? (
        <div className="info-box">
          <h3>{props.infoTitle ?? "Try These:"}</h3>
          <ul>
            {props.infoItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      ) : null}
      {props.children}
    </div>
  );
}

/**
 * Green "form submitted" panel used by the example routes.
 */
export function SubmittedView(props: {
  title?: string;
  data: Record<string, unknown>;
  resetLabel?: string;
  onReset: () => void;
}) {
  return (
    <div className="submitted">
      <h2>{props.title ?? "Submitted Data:"}</h2>
      <pre>{JSON.stringify(props.data, null, 2)}</pre>
      <button onClick={props.onReset}>
        {props.resetLabel ?? "Reset Form"}
      </button>
    </div>
  );
}

/**
 * A controlled form (FormView) with a submitted view. The form data
 * is managed externally via React state. Call form.onSubmit() on the
 * passed form (once) to populate the submitted view.
 */
export function ControlledForm(props: {
  form: Form<any>;
  data: Record<string, unknown>;
  submittedTitle?: string;
  resetLabel?: string;
  onReset?: () => void;
}) {
  const [submitted, setSubmitted] = React.useState<Record<
    string,
    unknown
  > | null>(null);
  const [data, setData] = React.useState<Record<string, unknown>>(props.data);
  const reset = () => {
    setSubmitted(null);
    setData(props.data);
    props.onReset?.();
  };
  props.form.onSubmit((e, formData) => {
    e.preventDefault();
    setSubmitted(formData);
  });
  props.form.onDataChange((newData) => {
    setData(newData as Record<string, unknown>);
  });
  return submitted ? (
    <SubmittedView
      title={props.submittedTitle}
      data={submitted}
      resetLabel={props.resetLabel}
      onReset={reset}
    />
  ) : (
    <ThemedFormView form={props.form} data={data} />
  );
}
