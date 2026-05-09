<script lang="ts">
  import {
    createForm,
    textField,
    emailField,
    booleanField,
    selectWidget,
    equals,
    or,
    and,
    not,
  } from "@fab4m/fab4m";
  import FormView from "../../lib/components/FormView.svelte";
  import FormProvider from "../../lib/components/FormProvider.svelte";
  import allWidgetsRenderer from "../../lib/allwidgets.ts";

  const form = createForm({
    accountType: textField({
      label: "Account Type",
      required: true,
      widget: selectWidget([
        ["personal", "Personal"],
        ["business", "Business"],
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
  }, {
    title: "Conditional Fields Demo",
    description: "Fields appear/disappear based on your selections",
  });

  let data = $state<Record<string, unknown>>({ accountType: "personal" });
  let submitted = $state<Record<string, unknown> | null>(null);

  form.onSubmit((e, formData) => {
    e.preventDefault();
    submitted = formData;
  });
</script>

<svelte:head>
  <title>Conditional Rules - Fab4m Svelte</title>
</svelte:head>

<h1>Conditional Rules Example</h1>

<p>Fields in this form appear or disappear based on the values of other fields. Watch how the form changes as you make selections!</p>

<div class="info-box">
  <h3>Try These:</h3>
  <ul>
    <li><strong>Switch account type</strong> - See personal vs business fields</li>
    <li><strong>Subscribe to newsletter as personal</strong> - See special offers appear</li>
    <li><strong>Choose business but don't subscribe</strong> - See marketing call option</li>
    <li><strong>Choose business and subscribe</strong> - Marketing call option hides</li>
  </ul>
</div>

{#if submitted}
  <div class="submitted">
    <h2>Submitted Data:</h2>
    <pre>{JSON.stringify(submitted, null, 2)}</pre>
    <button onclick={() => { submitted = null; data = { accountType: "personal" }; }}>
      Reset Form
    </button>
  </div>
{:else}
  <FormProvider renderer={allWidgetsRenderer}>
    <FormView {form} {data} />
  </FormProvider>
{/if}

<style>
  h1 {
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #666;
    margin-bottom: 1rem;
  }
  
  .info-box {
    background: #f0f8ff;
    border: 1px solid #0066cc;
    border-radius: 4px;
    padding: 1rem;
    margin-bottom: 1.5rem;
  }
  
  .info-box h3 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    color: #0066cc;
  }
  
  .info-box ul {
    margin: 0;
    padding-left: 1.5rem;
  }
  
  .info-box li {
    margin-bottom: 0.25rem;
  }
  
  .submitted {
    background: #f0fff0;
    border: 1px solid #0a0;
    border-radius: 4px;
    padding: 1rem;
    margin-bottom: 1rem;
  }
  
  .submitted h2 {
    margin-top: 0;
    color: #0a0;
  }
  
  pre {
    background: #fff;
    padding: 1rem;
    border-radius: 4px;
    overflow-x: auto;
  }
  
  button {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background: #0066cc;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background: #0055aa;
  }
</style>
