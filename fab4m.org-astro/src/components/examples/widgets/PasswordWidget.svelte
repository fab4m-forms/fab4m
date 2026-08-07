<script lang="ts">
  import { createForm, passwordField, passwordWidget } from "@fab4m/fab4m";
  import {
    StatefulFormView,
    FormProvider,
    allWidgetsRenderer,
  } from "@fab4m/svelte";

  const form = createForm({
    password: passwordField({
      label: "Password",
      widget: passwordWidget(),
    }),
  }).onSubmit((e) => e.preventDefault());
</script>

<FormProvider renderer={allWidgetsRenderer}>
  <StatefulFormView {form} hideSubmit={true} />
</FormProvider>