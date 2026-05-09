<script lang="ts">
  import {
    formDataDefinition,
    getNextPart,
    validateFormPart,
    type FormSubmitEvent,
  } from "@fab4m/fab4m";
  import type {
    FormComponentWithName,
    FormViewProps,
    ValidationError,
  } from "@fab4m/fab4m";

  // Convert native SubmitEvent to FormSubmitEvent
  function toFormSubmitEvent(e: SubmitEvent): FormSubmitEvent {
    let defaultPrevented = false;
    let propagationStopped = false;
    const originalPreventDefault = e.preventDefault.bind(e);
    const originalStopPropagation = e.stopPropagation.bind(e);
    
    return {
      preventDefault: () => {
        defaultPrevented = true;
        originalPreventDefault();
      },
      isDefaultPrevented: () => defaultPrevented,
      stopPropagation: () => {
        propagationStopped = true;
        originalStopPropagation();
      },
      isPropagationStopped: () => propagationStopped,
      persist: () => {},
      timeStamp: e.timeStamp,
      nativeEvent: e,
      target: e.target as HTMLFormElement,
      bubbles: e.bubbles,
      cancelable: e.cancelable,
      defaultPrevented: defaultPrevented,
      eventPhase: e.eventPhase,
      isTrusted: e.isTrusted,
      type: e.type,
    };
  }

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

  const formData = $derived(data as Record<string, unknown>);

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
    const formEvent = toFormSubmitEvent(e);
    const next = getNextPart(parts, part, formData);
    if (next === -1) {
      form.triggerSubmit(formEvent, formData);
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
    const originalPreventDefault = e.preventDefault.bind(e);
    e.preventDefault = () => {
      defaultPrevented = true;
    };
    // Since validation is an async process we need to prevent the default
    // event handling here first. Once the validation has completed
    // we change the validated ref to true, so that we know the form is
    // properly validated, and submit again so that we get a new clean event.
    originalPreventDefault();
    const formEvent = toFormSubmitEvent(e);
    const validationErrors = await validateFormPart(
      form,
      part,
      formData,
      formEvent,
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
        form.triggerAfterSubmit(formEvent, formData);
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
    aria-describedby={form.description ? "form-description" : undefined}
    class={className ?? "form"}
    method="post"
    bind:this={formRef}
    {action}
    onsubmit={onSubmit}
  >
    {#if form.description}
      <p id="form-description" class="sr-only">{form.description}</p>
    {/if}
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
