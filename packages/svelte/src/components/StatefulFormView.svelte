<script lang="ts">
  import { FormViewProps } from "@fab4m/fab4m";
  import FormView from "./FormView.svelte";

  /**
   * Use this component to render a form which manages the form state internally,
   * @group Svelte API
   */
  type Props = Omit<FormViewProps, "data"> & {
    data?: unknown;
  };

  let { form, data: initialData, ...restProps }: Props = $props();

  // Internal state for form data
  let data = $state(initialData ?? {});

  // We keep track of the current indices where our listeners are.
  let listenerIndices = [-1, -1];

  $effect(() => {
    // The new indices will be at the end of the array.
    const newIndices = [
      form.afterSubmitListeners.length,
      form.dataChangeListeners.length,
    ];
    if (listenerIndices[0] !== -1) {
      form.afterSubmitListeners.splice(listenerIndices[0], 1);
    }
    form.onAfterSubmit(() => {
      data = initialData ?? {};
    }, true);
    if (listenerIndices[1] !== -1) {
      form.dataChangeListeners.splice(listenerIndices[1], 1);
    }
    form.onDataChange((newData) => {
      data = newData;
    }, true);
    listenerIndices = newIndices;
    // Remove the listeners when the component unmounts.
    return () => {
      form.afterSubmitListeners.splice(listenerIndices[0], 1);
      form.dataChangeListeners.splice(listenerIndices[1], 1);
    };
  });
</script>

<FormView {form} data={data} {...restProps} />
