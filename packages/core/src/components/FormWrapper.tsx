import React from "react";
import { FormComponentWithName } from "../component";
import { getNextPart, validateFormPart } from "../form";
import { ValidationError } from "../validator";
import { formDataDefinition, FormViewProps } from "../formview";
/**
 * This form wrapper component does a lot of heavy lifting with
 * managing the form and it's state. It's mostly for internal use,
 * but it might be useful if you are creating a custom form view component.
 * @group React form rendering internals
 */
export default function FormWrapper(
  props: FormViewProps & {
    part: number;
    children: React.ReactNode;
    parts: FormComponentWithName[][];
    className?: string;
    setPart: (part: number) => void;
    setFormErrors: (errors: ValidationError[]) => void;
  },
): JSX.Element {
  const formRef = React.useRef<HTMLFormElement>(null);

  // This ref keeps track on if we completed the submission process.
  // Normally browsers don't seem to execute the submit handlers
  // when calling submit() directly on the form, but jsDOM does it
  // and should any other browser do it we need to handle that gracefully.
  const submitted = React.useRef<boolean>();
  const data = props.data as Record<string, unknown>;
  let formProps: React.FormHTMLAttributes<HTMLFormElement> = {
    className: "form",
  };
  const definition = JSON.stringify(formDataDefinition(props.form, data));
  for (const component of props.parts[props.part]) {
    if (component.type.formProps) {
      formProps = component.type.formProps(formProps, component);
    }
  }
  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    const next = getNextPart(props.parts, props.part, data);
    if (next === -1) {
      props.form.triggerSubmit(e, data);
    } else {
      e.preventDefault();
      props.setPart(next);
    }
    return next;
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Bail if we already completed the submission process.
    if (submitted.current) {
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
    const errors = await validateFormPart(
      props.form,
      props.part,
      props.data as Record<string, unknown>,
      e,
    );
    if (errors.length === 0) {
      if (props.errors && props.errors?.length > 0) {
        props.setFormErrors([]);
      }
      const next = submitForm(e);
      if (!defaultPrevented) {
        submitted.current = true;
        formRef.current?.submit();
      } else if (next === -1) {
        props.form.triggerAfterSubmit(e, data);
      }
    } else {
      props.setFormErrors(errors);
    }
  };
  return (
    <div className={props.form.theme.classes.formWrapper}>
      <form
        {...formProps}
        aria-label={props.form.title}
        aria-description={props.form.description}
        className={props.className ?? "form"}
        method="post"
        ref={formRef}
        action={props.action}
        onSubmit={onSubmit}
      >
        <input type="hidden" name="_definition" value={definition} />
        <input
          type="hidden"
          name="_renderer"
          value={props.ssr ? "ssr" : "js"}
        />
        <ExtraData extra={props.extra} />
        {props.children}
      </form>
    </div>
  );
}

function ExtraData(props: { extra?: Record<string, string | number> }) {
  if (!props.extra) {
    return null;
  }
  const fields = [];
  for (const key in props.extra) {
    fields.push(
      <input
        type="hidden"
        key={key}
        name={key}
        id={key}
        value={props.extra[key]}
      />,
    );
  }
  return <>{fields}</>;
}
