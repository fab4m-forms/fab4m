<script lang="ts">
  import { untrack } from "svelte";
  import {
    Form,
    formParts,
    getNextPart,
    getPrevPart,
  } from "@fab4m/fab4m";
  import type {
    FormViewProps,
    ValidationError,
  } from "@fab4m/fab4m";
  import {
    setFormDataContext,
    setFormErrorsContext,
  } from "../context.js";
  import FormPager from "./FormPager.svelte";
  import FormPart from "./FormPart.svelte";
  import FormWrapper from "./FormWrapper.svelte";

  /**
   * This component is used to render any form with the provided data.
   * @group Svelte API
   */
  type Props = FormViewProps;

  let {
    form,
    data,
    errors,
    errorsChanged,
    part: propsPart,
    ssr,
    idPrefix,
    className,
    disabled,
    hideSubmit,
    extra,
    action,
  }: Props = $props();

  // Initialize form errors state
  // If errorsChanged is provided (controlled mode), use errors from props
  // Otherwise, use internal state
  let internalFormErrors = $state(untrack(() => errors ?? []));
  let formErrors = $derived(
    errorsChanged ? (errors ?? []) : internalFormErrors,
  );
  function setFormErrors(e: ValidationError[]) {
    if (errorsChanged) {
      errorsChanged(e);
    } else {
      internalFormErrors = e;
    }
  }

  // Initialize part state
  let part = $state(untrack(() => typeof propsPart !== "undefined" ? propsPart : 0));

  const setPart = (newPart: number) => {
    part = newPart;
  };

  const goBack = () => {
    part = part - 1;
  };

  const formData = $derived(data as Record<string, unknown>);
  const parts = $derived(formParts(form, formData));
  const hasNextPart = $derived(
    getNextPart(parts, part, formData) !== -1,
  );
  const hasPrevPart = $derived(
    getPrevPart(parts, part, formData) !== -1,
  );

  // Set context for child components
  $effect(() => {
    setFormDataContext(formData);
    setFormErrorsContext(formErrors);
  });
</script>

<FormWrapper
  {form}
  data={formData}
  errors={formErrors}
  {parts}
  {part}
  {setPart}
  {ssr}
  {className}
  {setFormErrors}
  {extra}
  {action}
>
  {#if typeof propsPart !== "undefined"}
    <FormPart
      ssr={!!ssr}
      form={form as Form<Record<string, unknown>>}
      hide={false}
      {idPrefix}
      errors={formErrors}
      data={formData}
      components={parts[part]}
    />
  {:else}
    {#each parts.slice(0, part + 1) as formPart, index}
      <FormPart
        ssr={!!ssr}
        form={form as Form<Record<string, unknown>>}
        {idPrefix}
        hide={index !== part}
        errors={formErrors}
        data={formData}
        components={formPart}
      />
    {/each}
  {/if}
  <FormPager
    theme={form.theme}
    {form}
    {part}
    {disabled}
    {hasNextPart}
    {hasPrevPart}
    {goBack}
    noParts={parts.length}
    {hideSubmit}
  />
</FormWrapper>
