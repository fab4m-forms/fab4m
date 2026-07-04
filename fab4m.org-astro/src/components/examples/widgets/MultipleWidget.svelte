<script lang="ts">
  import { createForm, textField, tagsWidget } from "@fab4m/fab4m";
  import {
    StatefulFormView,
    FormProvider,
    allWidgetsRenderer,
  } from "@fab4m/svelte";

  const form = createForm({
    tags: textField({
      label: "Tags",
      multiple: true,
      multipleWidget: tagsWidget(),
    }),
  });
</script>

<FormProvider renderer={allWidgetsRenderer}>
  <StatefulFormView {form} hideSubmit={true} />
</FormProvider>
