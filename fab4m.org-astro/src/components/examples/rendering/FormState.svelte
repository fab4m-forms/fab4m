<script lang="ts">
  import { textField, createForm } from "@fab4m/fab4m";
  import { FormView, FormProvider, allWidgetsRenderer } from "@fab4m/svelte";

  const form = createForm({
    text: textField({ label: "Text field" }),
  });

  let data = $state({ text: "Some text" });

  form.onDataChange((newData) => {
    data = newData;
  });
</script>

<div>
  <FormProvider renderer={allWidgetsRenderer}>
    <FormView {form} {data} hideSubmit={true} />
  </FormProvider>
  <p>{data.text}</p>
</div>
