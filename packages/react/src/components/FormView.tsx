import * as React from "react";
import {
  Form,
  FormDataContext,
  FormErrorsContext,
  formParts,
  getNextPart,
  getPrevPart,
} from "../form";
import { FormViewProps } from "../formview";
import FormPager from "./FormPager";
import { ValidationError } from "../validator";
import FormPart from "./FormPart";
import FormWrapper from "./FormWrapper";

/**
 * This component is used to render any form with the provided data.
 * @group React API
 */
export default function FormView(props: FormViewProps): React.JSX.Element {
  const [formErrors, setFormErrors] = initFormErrors(
    props.errors,
    props.errorsChanged,
  );
  const [part, setPart] = React.useState(
    typeof props.part !== "undefined" ? props.part : 0,
  );
  const goBack = () => {
    setPart(part - 1);
  };
  const data = props.data as Record<string, unknown>;
  const parts = formParts(props.form, data);
  const renderedParts =
    typeof props.part !== "undefined" ? (
      <FormPart
        ssr={!!props.ssr}
        form={props.form as Form<Record<string, unknown>>}
        hide={false}
        idPrefix={props.idPrefix}
        errors={formErrors}
        data={data}
        components={parts[part]}
      />
    ) : (
      parts
        .slice(0, part + 1)
        .map((formPart, index) => (
          <FormPart
            ssr={!!props.ssr}
            form={props.form as Form<Record<string, unknown>>}
            key={index}
            idPrefix={props.idPrefix}
            hide={index !== part}
            errors={formErrors}
            data={data}
            components={formPart}
          />
        ))
    );
  return (
    <FormDataContext.Provider value={data}>
      <FormErrorsContext.Provider value={formErrors}>
        <FormWrapper
          {...props}
          parts={parts}
          part={part}
          setPart={setPart}
          ssr={props.ssr}
          className={props.className}
          setFormErrors={setFormErrors}
        >
          {renderedParts}
          <FormPager
            theme={props.form.theme}
            form={props.form}
            part={part}
            disabled={props.disabled}
            hasNextPart={getNextPart(parts, part, data) !== -1}
            hasPrevPart={getPrevPart(parts, part, data) !== -1}
            goBack={goBack}
            noParts={parts.length}
            hideSubmit={props.hideSubmit}
          />
        </FormWrapper>
      </FormErrorsContext.Provider>
    </FormDataContext.Provider>
  );
}

export function initFormErrors(
  errors?: ValidationError[],
  errorsChanged?: (errors: ValidationError[]) => void,
): [ValidationError[], (errors: ValidationError[]) => void] {
  if (errorsChanged) {
    return [errors ?? [], errorsChanged];
  }
  return React.useState(errors ?? []);
}
