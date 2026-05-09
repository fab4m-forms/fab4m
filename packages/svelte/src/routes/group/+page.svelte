<script lang="ts">
  import {
    createForm,
    textField,
    emailField,
    integerField,
    booleanField,
    group,
    fieldsetWidget,
    horizontalGroupWidget,
    selectWidget,
  } from "@fab4m/fab4m";
  import FormView from "../../lib/components/FormView.svelte";

  const form = createForm({
    // Basic group with nested fields
    personalInfo: group({
      label: "Personal Information",
      description: "Your basic details",
    }, {
      firstName: textField({
        label: "First Name",
        required: true,
      }),
      lastName: textField({
        label: "Last Name",
        required: true,
      }),
    }),
    
    // Group with fieldset widget for visual grouping
    address: group({
      label: "Address",
      description: "Where can we reach you?",
      widget: fieldsetWidget(),
    }, {
      street: textField({
        label: "Street Address",
        required: true,
      }),
      city: textField({
        label: "City",
        required: true,
      }),
      zipCode: textField({
        label: "ZIP / Postal Code",
        required: true,
      }),
      country: textField({
        label: "Country",
        required: true,
        widget: selectWidget([
          ["United States", "US"],
          ["Canada", "CA"],
          ["United Kingdom", "UK"],
          ["Germany", "DE"],
          ["France", "FR"],
          ["Other", "other"],
        ]),
      }),
    }),
    
    // Horizontal group for inline fields
    emergencyContact: group({
      label: "Emergency Contact",
      widget: horizontalGroupWidget(),
    }, {
      contactName: textField({
        label: "Name",
        required: false,
      }),
      contactPhone: textField({
        label: "Phone",
        required: false,
      }),
    }),
    
    // Nested group - group inside another group
    employment: group({
      label: "Employment Details",
      widget: fieldsetWidget(),
    }, {
      company: textField({
        label: "Company Name",
        required: false,
      }),
      jobDetails: group({
        label: "Job Details",
      }, {
        title: textField({
          label: "Job Title",
          required: false,
        }),
        department: textField({
          label: "Department",
          required: false,
        }),
        yearsEmployed: integerField({
          label: "Years at Company",
          required: false,
        }),
      }),
    }),
    
    // Boolean field for preferences
    subscribeNewsletter: booleanField({
      label: "Subscribe to newsletter",
      description: "Receive updates about our products",
      required: false,
    }),
  }, {
    title: "Group Fields Demo",
    description: "Organized form with nested field groups",
  });

  let data = $state<Record<string, unknown>>({});
  let submitted = $state<Record<string, unknown> | null>(null);

  form.onSubmit((e, formData) => {
    e.preventDefault();
    submitted = formData;
  });
</script>

<svelte:head>
  <title>Group Fields - Fab4m Svelte</title>
</svelte:head>

<h1>Group Fields Example</h1>

<p>This form demonstrates how to organize fields into logical groups. Groups can be nested and styled differently.</p>

<div class="info-box">
  <h3>Group Types Shown:</h3>
  <ul>
    <li><strong>Basic Group</strong> - Simple container for related fields</li>
    <li><strong>Fieldset Group</strong> - Visual grouping with a border</li>
    <li><strong>Horizontal Group</strong> - Fields displayed inline</li>
    <li><strong>Nested Groups</strong> - Groups within groups</li>
  </ul>
</div>

{#if submitted}
  <div class="submitted">
    <h2>Submitted Data:</h2>
    <pre>{JSON.stringify(submitted, null, 2)}</pre>
    <button onclick={() => { submitted = null; data = {}; }}>
      Reset Form
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
