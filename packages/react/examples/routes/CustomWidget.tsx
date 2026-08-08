import * as React from "react";
import { booleanField, createForm, textField } from "@fab4m/fab4m";
import {
  customWidget,
  FormProvider,
  allWidgetsRenderer,
} from "../../src/index";
import { ControlledForm, PageShell } from "../PageShell";
import { RatingWidget } from "../custom-widget/RatingWidget";
import { ToggleWidget } from "../custom-widget/ToggleWidget";

// Define a form with custom widgets
const form = createForm(
  {
    name: textField({
      label: "Your Name",
      required: true,
    }),

    satisfaction: textField({
      label: "Satisfaction Rating",
      description: "How satisfied are you with our service?",
      required: true,
      widget: customWidget<number>(RatingWidget),
    }),

    notifications: booleanField({
      label: "Enable Notifications",
      description: "Receive push notifications",
      required: false,
      widget: customWidget<boolean>(ToggleWidget),
    }),

    feedback: textField({
      label: "Additional Feedback",
      description: "Any other comments?",
      required: false,
    }),
  },
  {
    title: "Custom Widgets Demo",
    description: "Form with custom star rating and toggle switch widgets",
  },
);

export function CustomWidget() {
  return (
    <PageShell
      title="Custom Widget Example"
      description={
        <>
          This example shows how to create custom widgets using{" "}
          <code>customWidget()</code>. The rating and toggle widgets are custom
          React components.
        </>
      }
      infoTitle="Creating Custom Widgets:"
      infoItems={[
        <span key="props">
          Create a React component that accepts <code>WidgetProps</code>
        </span>,
        <span key="widget">
          Use <code>customWidget(YourComponent)</code> as the widget
        </span>,
        <span key="onchange">
          Remember to call <code>onChange(value)</code> when the value changes
        </span>,
        <span key="hidden">
          Include a hidden input with the correct <code>name</code> for form
          submission
        </span>,
      ]}
    >
      <FormProvider renderer={allWidgetsRenderer}>
        <ControlledForm
          form={form}
          data={{ satisfaction: 0, notifications: false }}
        />
      </FormProvider>
    </PageShell>
  );
}
