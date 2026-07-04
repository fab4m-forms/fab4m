<script lang="ts">
  import {
    createForm,
    textField,
    integerField,
    textAreaWidget,
  } from "@fab4m/fab4m";
  import {
    StatefulFormView,
    FormProvider,
    allWidgetsRenderer,
  } from "@fab4m/svelte";

  const form = createForm({
    name: textField({ label: "Name" }),
    bio: textField({ label: "Bio", widget: textAreaWidget() }),
    age: integerField({ label: "Age" }),
  });

  let submitted = $state<{ name?: string } | undefined>(undefined);

  form.onSubmit((e, data) => {
    e.preventDefault();
    submitted = data;
  });
</script>

<FormProvider renderer={allWidgetsRenderer}>
  <StatefulFormView {form} />
</FormProvider>

{#if submitted}
  <p style="font-weight: bold;">Welcome {submitted.name}</p>
{/if}
