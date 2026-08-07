<script lang="ts">
  import { createForm, passwordField, validPassword } from "@fab4m/fab4m";
  import {
    StatefulFormView,
    FormProvider,
    allWidgetsRenderer,
  } from "@fab4m/svelte";

  const form = createForm({
    password: passwordField({
      label: "Password",
      validators: [
        validPassword({
          minLength: 8,
          requiredLetter: true,
          requiredNumber: true,
          requiredSpecialChar: true,
        }),
      ],
    }),
  }).onSubmit((e) => e.preventDefault());
</script>

<FormProvider renderer={allWidgetsRenderer}>
  <StatefulFormView {form} />
</FormProvider>