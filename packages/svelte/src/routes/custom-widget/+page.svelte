<script lang="ts">
  import { createForm, textField, booleanField, type WidgetProps } from "@fab4m/fab4m";
  import FormView from "../../lib/components/FormView.svelte";
  import FormProvider from "../../lib/components/FormProvider.svelte";
  import allWidgetsRenderer from "../../lib/allwidgets.ts";
  import { customWidget } from "../../lib/widgets/custom.js";
  import RatingWidget from "./RatingWidget.svelte";
  import ToggleWidget from "./ToggleWidget.svelte";

  // Define a form with custom widgets
  const form = createForm({
    name: textField({
      label: "Your Name",
      required: true,
    }),
    
    satisfaction: textField({
      label: "Satisfaction Rating",
      description: "How satisfied are you with our service?",
      required: true,
      widget: customWidget(RatingWidget),
    }),
    
    notifications: booleanField({
      label: "Enable Notifications",
      description: "Receive push notifications",
      required: false,
      widget: customWidget(ToggleWidget),
    }),
    
    feedback: textField({
      label: "Additional Feedback",
      description: "Any other comments?",
      required: false,
    }),
  }, {
    title: "Custom Widgets Demo",
    description: "Form with custom star rating and toggle switch widgets",
  });

  let data = $state<Record<string, unknown>>({ satisfaction: 0, notifications: false });
  let submitted = $state<Record<string, unknown> | null>(null);

  form.onSubmit((e, formData) => {
    e.preventDefault();
    submitted = formData;
  });
</script>

<svelte:head>
  <title>Custom Widget - Fab4m Svelte</title>
</svelte:head>

<h1>Custom Widget Example</h1>

<p>This example shows how to create custom widgets using <code>customWidget()</code>. The rating and toggle widgets are custom Svelte components.</p>

<div class="info-box">
  <h3>Creating Custom Widgets:</h3>
  <ul>
    <li>Create a Svelte component that accepts <code>WidgetProps</code></li>
    <li>Use <code>customWidget(YourComponent)</code> as the widget</li>
    <li>Remember to call <code>onChange(value)</code> when the value changes</li>
    <li>Include a hidden input with the correct <code>name</code> for form submission</li>
  </ul>
</div>

{#if submitted}
  <div class="submitted">
    <h2>Submitted Data:</h2>
    <pre>{JSON.stringify(submitted, null, 2)}</pre>
    <button onclick={() => { submitted = null; data = { satisfaction: 0, notifications: false }; }}>
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
  
  code {
    background: #f4f4f4;
    padding: 0.2rem 0.4rem;
    border-radius: 3px;
    font-family: monospace;
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
