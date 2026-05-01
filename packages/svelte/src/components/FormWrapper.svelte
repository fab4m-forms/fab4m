<script lang="ts">
  import {
    FormComponentWithName,
    FormViewProps,
    formDataDefinition,
    getNextPart,
    validateFormPart,
    ValidationError,
  } from "@fab4m/fab4m";

  type Props = FormViewProps & {
    part: number;
    parts: FormComponentWithName[][];
    className?: string;
    setPart: (part: number) => void;
    setFormErrors: (errors: ValidationError[]) => void;
  };

  let {
    form,
    data,
    errors,
    part,
    parts,
    className,
    setPart,
    setFormErrors,
    ssr,
    action,
    extra,
  }: Props = $props();

  let formRef: HTMLFormElement;
  let submitted = false;

  const formData = data as Record<string, unknown>;

  let formProps = $derived.by(() => {
    let fp: Record<string, unknown> = {
      class: "form",
    };
    for (const component of parts[part]) {
      if (component.type.formProps) {
        fp = component.type.formProps(fp, component);
      }
    }
    return fp;
  });

  let definition = $derived(
    JSON.stringify(formDataDefinition(form, formData)),
  );

  const submitForm = (e: SubmitEvent) => {
    const next = getNextPart(parts, part, formData);
    if (next === -1) {
      form.triggerSubmit(e, formData);
    } else {
      e.preventDefault();
      setPart(next);
    }
    return next;
  };

  const onSubmit = async (e: SubmitEvent) => {
    // Bail if we already completed the submission process.
    if (submitted) {
      return;
    }
    // We need to do some black magic here to know if we should
    // submit the form or not. This trick works in all browsers,
    // and avoids having to do an actual re-submit of the form.
    let defaultPrevented = false;
    (e as any).originalPreventDefault = e.preventDefault;
    e.preventDefault = () => {
      defaultPrevented = true;
    };
    // Since validation is an async process we need to prevent the default
    // event handling here first. Once the validation has completed
    // we change the validated ref to true, so that we know the form is
    // properly validated, and submit again so that we get a new clean event.
    (e as any).originalPreventDefault();
    const validationErrors = await validateFormPart(
      form,
      part,
      formData,
      e,
    );
    if (validationErrors.length === 0) {
      if (errors && errors.length > 0) {
        setFormErrors([]);
      }
      const next = submitForm(e);
      if (!defaultPrevented) {
        submitted = true;
        formRef?.submit();
      } else if (next === -1) {
        form.triggerAfterSubmit(e, formData);
      }
    } else {
      setFormErrors(validationErrors);
    }
  };
</script>

<div class={form.theme.classes.formWrapper}>
  <form
    {...formProps}
    aria-label={form.title}
    aria-description={form.description}
    class={className ?? "form"}
    method="post"
    bind:this={formRef}
    {action}
    onsubmit={onSubmit}
  >
    <input type="hidden" name="_definition" value={definition} />
    <input type="hidden" name="_renderer" value={ssr ? "ssr" : "js"} />
    {#if extra}
      {#each Object.entries(extra) as [key, value]}
        <input type="hidden" name={key} id={key} {value} />
      {/each}
    {/if}
    <slot />
  </form>
</div>
