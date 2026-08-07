<script lang="ts">
  import { createForm, passwordField } from "@fab4m/fab4m";
  import {
    StatefulFormView,
    FormProvider,
    allWidgetsRenderer,
  } from "@fab4m/svelte";

  const form = createForm({
    password: passwordField({
      label: "Password",
    }),
  }).onSubmit((e) => e.preventDefault());
</script>

<FormProvider renderer={allWidgetsRenderer}>
  <StatefulFormView {form} />
</FormProvider>