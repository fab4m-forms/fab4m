<script lang="ts">
  import {
    createForm,
    passwordVerifyField,
    passwordVerifyWidget,
  } from "@fab4m/fab4m";
  import {
    StatefulFormView,
    FormProvider,
    allWidgetsRenderer,
  } from "@fab4m/svelte";

  const form = createForm({
    password: passwordVerifyField({
      label: "Password",
      widget: passwordVerifyWidget("Type your password again"),
    }),
  }).onSubmit((e) => e.preventDefault());
</script>

<FormProvider renderer={allWidgetsRenderer}>
  <StatefulFormView {form} hideSubmit={true} />
</FormProvider>