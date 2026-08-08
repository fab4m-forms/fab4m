import * as React from "react";
import {
  and,
  booleanField,
  createForm,
  emailField,
  equals,
  not,
  or,
  selectWidget,
  textField,
} from "@fab4m/fab4m";
import { FormProvider, allWidgetsRenderer } from "../../src/index";
import { ControlledForm, PageShell } from "../PageShell";

const form = createForm(
  {
    accountType: textField({
      label: "Account Type",
      required: true,
      widget: selectWidget([
        ["Personal", "personal"],
        ["Business", "business"],
      ]),
    }),

    // Show only for personal accounts
    nickname: textField({
      label: "Nickname",
      description: "How should we call you?",
      required: false,
      rules: [["accountType", equals("personal")]],
    }),

    // Show only for business accounts
    companyName: textField({
      label: "Company Name",
      required: true,
      rules: [["accountType", equals("business")]],
    }),

    businessEmail: emailField({
      label: "Business Email",
      required: true,
      rules: [["accountType", equals("business")]],
    }),

    // Show if personal OR business (all account types)
    newsletter: booleanField({
      label: "Subscribe to newsletter",
      description: "Get updates and tips",
      required: false,
    }),

    // Complex rule: show if business AND NOT newsletter
    marketingCall: booleanField({
      label: "Request a marketing call",
      description: "Our team will reach out to discuss your needs",
      required: false,
      rules: [
        and([
          ["accountType", equals("business")],
          not([["newsletter", equals(true)]]),
        ]),
      ],
    }),

    // Show if (personal AND newsletter) OR (business)
    specialOffer: booleanField({
      label: "Receive special offers",
      description: "Exclusive deals and promotions",
      required: false,
      rules: [
        or([
          and([
            ["accountType", equals("personal")],
            ["newsletter", equals(true)],
          ]),
          ["accountType", equals("business")],
        ]),
      ],
    }),
  },
  {
    title: "Conditional Fields Demo",
    description: "Fields appear/disappear based on your selections",
  },
);

export function Conditional() {
  return (
    <PageShell
      title="Conditional Rules Example"
      description={
        <>
          Fields in this form appear or disappear based on the values of other
          fields. Watch how the form changes as you make selections!
        </>
      }
      infoItems={[
        <strong key="type">
          Switch account type - See personal vs business fields
        </strong>,
        <strong key="newsletter">
          Subscribe to newsletter as personal - See special offers appear
        </strong>,
        <strong key="business">
          Choose business but don't subscribe - See marketing call option
        </strong>,
        <strong key="business-sub">
          Choose business and subscribe - Marketing call option hides
        </strong>,
      ]}
    >
      <FormProvider renderer={allWidgetsRenderer}>
        <ControlledForm form={form} data={{ accountType: "personal" }} />
      </FormProvider>
    </PageShell>
  );
}
