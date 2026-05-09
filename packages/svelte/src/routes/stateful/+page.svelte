<script lang="ts">
  import { createForm, textField, emailField, booleanField } from "@fab4m/fab4m";
  import StatefulFormView from "../../lib/components/StatefulFormView.svelte";
  import FormProvider from "../../lib/components/FormProvider.svelte";
  import allWidgetsRenderer from "../../lib/allwidgets.ts";

  const form = createForm({
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
  }, {
    title: "Quick Contact Form",
    description: "Stateful form that manages its own data",
  });

  let submitted = $state<Record<string, unknown> | null>(null);
  let lastChange = $state<string>("");

  // Track data changes
  form.onDataChange((newData) => {
    lastChange = JSON.stringify(newData);
  });

  form.onSubmit((e, formData) => {
    e.preventDefault();
    submitted = formData;
  });
</script>

<svelte:head>
  <title>Stateful Form - Fab4m Svelte</title>
</svelte:head>

<h1>Stateful Form Example</h1>

<p>The <code>StatefulFormView</code> component manages form state internally. It automatically resets after submission and tracks data changes.</p>

<div class="info-box">
  <h3>Features:</h3>
  <ul>
    <li>Manages its own data state</li>
    <li>Automatically resets after successful submission</li>
    <li>Use <code>form.onDataChange()</code> to react to data changes</li>
    <li>Great for simple forms where you don't need external state management</li>
  </ul>
</div>

<div class="live-data">
  <h3>Live Data Changes:</h3>
  <pre>{lastChange || "(no changes yet)"}</pre>
</div>

{#if submitted}
  <div class="submitted">
    <h2>Form Submitted!</h2>
    <p>The form will reset automatically when you click below.</p>
    <pre>{JSON.stringify(submitted, null, 2)}</pre>
    <button onclick={() => { submitted = null; lastChange = ""; }}>
      Reset (form already cleared itself)
    </button>
  </div>
{:else}
  <FormProvider renderer={allWidgetsRenderer}>
    <StatefulFormView {form} />
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
    margin-bottom: 1rem;
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
  
  .live-data {
    background: #fff8e1;
    border: 1px solid #ff9800;
    border-radius: 4px;
    padding: 1rem;
    margin-bottom: 1.5rem;
  }
  
  .live-data h3 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    color: #e65100;
  }
  
  .live-data pre {
    background: #fff;
    padding: 0.5rem;
    border-radius: 4px;
    overflow-x: auto;
    margin: 0;
    font-size: 0.9rem;
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
  
  .submitted pre {
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
