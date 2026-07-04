<script lang="ts">
  import {
    createForm,
    textField,
    booleanField,
    integerField,
    emailField,
    pageBreak,
  } from "@fab4m/fab4m";
  import {
    StatefulFormView,
    FormProvider,
    allWidgetsRenderer,
  } from "@fab4m/svelte";

  const form = createForm({
    name: textField({
      label: "Your name",
      description: "Enter your full name",
      required: true,
    }),
    email: emailField({ label: "Email" }),
    break1: pageBreak({}),
    age: integerField({ label: "Age" }),
    city: textField({ label: "City" }),
    break2: pageBreak({}),
    agree: booleanField({
      label: "I agree to the terms and conditions",
      description: "Very long terms and conditions...",
      required: true,
    }),
  });

  form.onSubmit((e) => {
    e.preventDefault();
    alert("Form submitted!");
  });
</script>

<FormProvider renderer={allWidgetsRenderer}>
  <StatefulFormView {form} />
</FormProvider>
