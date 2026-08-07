<script lang="ts">
  import { createForm, passwordVerifyField } from "@fab4m/fab4m";
  import {
    StatefulFormView,
    FormProvider,
    allWidgetsRenderer,
  } from "@fab4m/svelte";

  const form = createForm({
    password: passwordVerifyField({
      label: "Password",
    }),
  }).onSubmit((e) => e.preventDefault());
</script>

<FormProvider renderer={allWidgetsRenderer}>
  <StatefulFormView {form} />
</FormProvider>