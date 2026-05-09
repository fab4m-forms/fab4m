<script lang="ts">
  import { createForm, textField, emailField, integerField, pageBreak } from "@fab4m/fab4m";
  import FormView from "../../lib/components/FormView.svelte";

  const form = createForm({
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
  }, {
    title: "Multi-step Registration",
    description: "Complete your profile in 3 easy steps",
    labels: {
      next: "Continue →",
      previous: "← Go Back",
      complete: "Complete Registration",
      submit: "Submit",
      required: "Required",
    },
  });

  let data = $state<Record<string, unknown>>({});
  let submitted = $state<Record<string, unknown> | null>(null);

  form.onSubmit((e, formData) => {
    e.preventDefault();
    submitted = formData;
  });
</script>

<svelte:head>
  <title>Multipage Form - Fab4m Svelte</title>
</svelte:head>

<h1>Multipage Form Example</h1>

<p>This form is split across multiple pages using page breaks. Navigate using the Previous/Next buttons.</p>

{#if submitted}
  <div class="submitted">
    <h2>🎉 Registration Complete!</h2>
    <pre>{JSON.stringify(submitted, null, 2)}</pre>
    <button onclick={() => { submitted = null; data = {}; }}>
      Start Over
    </button>
  </div>
{:else}
  <FormView {form} {data} />
{/if}

<style>
  h1 {
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #666;
    margin-bottom: 1.5rem;
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
