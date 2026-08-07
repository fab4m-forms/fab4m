<script lang="ts">
  import {
    createForm,
    passwordValidateOldField,
    validOldPassword,
  } from "@fab4m/fab4m";
  import {
    StatefulFormView,
    FormProvider,
    allWidgetsRenderer,
  } from "@fab4m/svelte";

  const form = createForm({
    password: passwordValidateOldField({
      label: "Password",
      validators: [
        validOldPassword(async (password) => {
          // You will probably do some request to the backend here.
          return password === "oldpassword";
        }),
      ],
    }),
  }).onSubmit((e) => e.preventDefault());
</script>

<FormProvider renderer={allWidgetsRenderer}>
  <StatefulFormView {form} />
</FormProvider>