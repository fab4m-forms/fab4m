import * as React from "react";
import { useParams, Link, useNavigate, useSubmit } from "react-router-dom";
import {
  FormPart,
  FormWrapper,
  FormPager,
  formParts,
  getNextPart,
  getPrevPart,
  ValidationError,
  FormViewProps,
} from "fab4m";

export interface FormRouteProps extends FormViewProps {
  basename?: string;
  completedParts?: number;
  basePath?: string;
  useRouteAction?: boolean;
}

export default function FormRoute(props: FormRouteProps): JSX.Element | null {
  const params = useParams<{ part?: string }>();
  if (props.useRouteAction) {
    const submit = useSubmit();
    props.form.onSubmit((e) => {
      e.preventDefault();
      submit(e.target as HTMLFormElement, { method: "post" });
    });
  }
  const navigate = useNavigate();
  const basePath = props.basePath ?? "";
  const [completedParts, changeCompletedParts] = React.useState(
    props.completedParts ?? 0
  );
  let part = params.part ? parseInt(params.part, 10) : null;
  if (!part) {
    part = props.part ?? 0;
  }
  const parts = formParts(props.form);
  // Ensure that the part we are trying to look at exists.
  React.useEffect(() => {
    if (part && (part > parts.length - 1 || part > completedParts)) {
      navigate(basePath + "/0");
    }
  }, [part]);
  const setPart = (part: number) => {
    changeCompletedParts(part);
    navigate(`${basePath}/${part}`);
  };
  const [formErrors, setFormErrors] = initFormErrors(
    props.errors,
    props.errorsChanged
  );
  if (part > parts.length - 1) {
    return null;
  }
  const data = props.data as Record<string, unknown>;
  const prevPart = getPrevPart(parts, part, data);
  const renderedParts = parts
    .slice(0, part + 1)
    .map((formPart, index) => (
      <FormPart
        ssr={!!props.ssr}
        form={props.form}
        key={index}
        idPrefix={props.idPrefix}
        hide={index !== part}
        errors={formErrors}
        data={data}
        components={formPart}
      />
    ));

  return (
    <FormWrapper
      {...props}
      parts={parts}
      part={part}
      setPart={setPart}
      setFormErrors={setFormErrors}
    >
      {renderedParts}
      <FormPager
        theme={props.form.theme}
        part={part}
        form={props.form}
        hasNextPart={getNextPart(parts, part, data) !== -1}
        hasPrevPart={prevPart !== -1}
        goBack={() => {}}
        back={() => <Link to={`${basePath}/${prevPart}`}>Previous</Link>}
        noParts={parts.length}
      />
    </FormWrapper>
  );
}

function initFormErrors(
  errors?: ValidationError[],
  errorsChanged?: (errors: ValidationError[]) => void
): [ValidationError[], (errors: ValidationError[]) => void] {
  if (errorsChanged) {
    return [errors ?? [], errorsChanged];
  }
  return React.useState(errors ?? []);
}
