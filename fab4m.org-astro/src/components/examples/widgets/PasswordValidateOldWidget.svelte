<script lang="ts">
  import {
    createForm,
    passwordValidateOldField,
    passwordValidateOldWidget,
  } from "@fab4m/fab4m";
  import {
    StatefulFormView,
    FormProvider,
    allWidgetsRenderer,
  } from "@fab4m/svelte";

  const form = createForm({
    password: passwordValidateOldField({
      label: "Password",
      widget: {
        ...passwordValidateOldWidget(),
        settings: {
          confirmTitle: "Type your password again",
          oldPasswordLabel: "Your old password",
        },
      },
    }),
  }).onSubmit((e) => e.preventDefault());
</script>

<FormProvider renderer={allWidgetsRenderer}>
  <StatefulFormView {form} hideSubmit={true} />
</FormProvider>