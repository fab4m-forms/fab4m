<script lang="ts">
  import { createForm, textField, emailField, integerField, textFieldWidget } from "@fab4m/fab4m";
  import FormProvider from "../../lib/components/FormProvider.svelte";
  import allWidgetsRenderer from "../../lib/allwidgets.ts";
  import StatefulFormView from "../../lib/components/StatefulFormView.svelte";

  const form = createForm({
    name: textField({
      label: "Full Name",
      description: "Enter your full name",
      required: true,
    }),
    email: emailField({
      label: "Email Address",
      description: "We'll never share your email",
      required: true,
    }),
    age: integerField({
      label: "Age",
      description: "Your age in years",
      required: false,
    }),
    bio: textField({
      label: "Biography",
      description: "Tell us about yourself",
      required: false,
      widget: textFieldWidget(),
    }),
  }, {
    title: "User Profile",
    description: "Create your user profile",
  });

  let data = $state({ name: "", email: "", age: undefined, bio: "" });
  let submitted = $state<Record<string, unknown> | null>(null);

  form.onSubmit((e, formData) => {
    e.preventDefault();
    submitted = formData;
    console.log("Form submitted:", formData);
  });
</script>

<svelte:head>
  <title>Simple Form - Fab4m Svelte</title>
</svelte:head>

<h1>Simple Form Example</h1>

<p>This example demonstrates a basic form with text, email, and number fields.</p>

{#if submitted}
  <div class="submitted">
    <h2>Submitted Data:</h2>
    <pre>{JSON.stringify(submitted, null, 2)}</pre>
    <button onclick={() => { submitted = null; data = { name: "", email: "", age: undefined, bio: "" }; }}>
      Reset Form
    </button>
  </div>
{:else}
	<FormProvider renderer={allWidgetsRenderer}>
		<StatefulFormView {form} {data} />
	</FormProvider>
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
