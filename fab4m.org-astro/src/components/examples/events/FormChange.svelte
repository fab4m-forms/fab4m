<script lang="ts">
  import {
    createForm,
    textField,
    integerField,
    textAreaWidget,
  } from "@fab4m/fab4m";
  import { FormView, FormProvider, allWidgetsRenderer } from "@fab4m/svelte";

  const form = createForm({
    name: textField({ label: "Name" }),
    bio: textField({ label: "Bio", widget: textAreaWidget() }),
    age: integerField({ label: "Age" }),
  });

  let data = $state({
    name: "Fabian Sörqvist",
    bio: "This is my bio",
    age: 33,
  });

  form.onDataChange((newData) => {
    data = newData;
  });
</script>

<FormProvider renderer={allWidgetsRenderer}>
  <FormView {form} {data} hideSubmit={true} />
</FormProvider>

<div>
  <dl>
    <dt>Name</dt>
    <dd>{data.name}</dd>
    <dt>Bio</dt>
    <dd>{data.bio}</dd>
    <dt>Age</dt>
    <dd>{data.age}</dd>
  </dl>
</div>
