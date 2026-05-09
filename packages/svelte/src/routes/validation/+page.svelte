<script lang="ts">
  import { createForm, textField, integerField, minLength, maxLength, min, max, allowedValues, disallowedValues } from "@fab4m/fab4m";
  import FormView from "../../lib/components/FormView.svelte";

  const form = createForm({
    username: textField({
      label: "Username",
      description: "Must be 3-20 characters, no 'admin' or 'moderator'",
      required: true,
      validators: [
        minLength(3),
        maxLength(20),
        disallowedValues(["admin", "moderator", "user"], "Username is reserved"),
      ],
    }),
    email: textField({
      label: "Email",
      description: "Enter a valid email address",
      required: true,
    }),
    age: integerField({
      label: "Age",
      description: "Must be between 18 and 120",
      required: true,
      validators: [min(17), max(121)], // Note: min/max validators use > and <, not >= and <=
    }),
    color: textField({
      label: "Favorite Color",
      description: "Pick from: red, blue, green, or yellow",
      required: true,
      validators: [
        allowedValues(["red", "blue", "green", "yellow"], "Please choose from the suggested colors"),
      ],
    }),
    password: textField({
      label: "Password",
      description: "Minimum 8 characters",
      required: true,
      validators: [minLength(7)], // Uses > so 7 means min 8
    }),
  }, {
    title: "Validation Demo",
    description: "Form with various validation rules",
  });

  let data = $state<Record<string, unknown>>({});
  let submitted = $state<Record<string, unknown> | null>(null);

  form.onSubmit((e, formData) => {
    e.preventDefault();
    submitted = formData;
  });
</script>

<svelte:head>
  <title>Validation - Fab4m Svelte</title>
</svelte:head>

<h1>Validation Example</h1>

<p>This example demonstrates various validation rules including length, range, allowed values, and more.</p>

<div class="info-box">
  <h3>Try These:</h3>
  <ul>
    <li>Enter "admin" as username (reserved value)</li>
    <li>Enter age below 18 or above 120</li>
    <li>Enter a color not in the list</li>
    <li>Enter a password with less than 8 characters</li>
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
