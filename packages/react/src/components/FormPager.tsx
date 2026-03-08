import * as React from "react";
import { Theme } from "../theme";
import { FormDefinition } from "../form";
/**
 * Renders the pager for multipage forms.
 * This component is mostly used internally, but it's useful if you need to create a custom
 * Form view component.
 * @group React API
 */
export default function FormPager(props: {
  /** The current form part. */
  part: number;
  /** The total number of for parts. */
  noParts: number;
  /** The current form theme. */
  theme: Theme;
  /** The form this pager is rendered for. */
  form: FormDefinition;
  /** True if there is a previous part. */
  hasPrevPart: boolean;
  /** True if there is a next part. */
  hasNextPart: boolean;
  /** This function will be called when the user requests to go back.*/
  goBack: () => void;
  /** Set this to true to disable the next and previous buttons. */
  disabled?: boolean;
  /** Set this to true to disable the submit button. */
  hideSubmit?: boolean;
  /** If needed you can provide custom go back react component */
  back?: React.ComponentType<{
    goBack: () => void;
  }>;
}): React.JSX.Element | null {
  const classes = props.theme.classes;
  if (props.noParts === 1) {
    if (props.hideSubmit) {
      return null;
    }
    return (
      <ElementWrapper theme={props.theme}>
        <input
          type="submit"
          disabled={props.disabled}
          className={classes.submitButton}
          value={props.form.labels?.submit ?? "Save"}
        />
      </ElementWrapper>
    );
  }
  return (
    <ElementWrapper theme={props.theme}>
      <div className={classes.pager}>
        {props.part > 0 &&
          (props.back ? (
            <props.back goBack={props.goBack} />
          ) : (
            <button
              value="prev"
              name="action"
              type="button"
              onClick={props.goBack}
              className={classes.pagerPrevious}
            >
              {props.form.labels?.previous ?? "Previous"}
            </button>
          ))}
        {props.hasNextPart ? (
          <button value="next" name="action" className={classes.pagerNext}>
            {props.form.labels?.next ?? "Next"}
          </button>
        ) : (
          !props.hideSubmit && (
            <button
              value="complete"
              name="action"
              disabled={props.disabled}
              className={classes.pagerComplete}
            >
              {props.form.labels?.complete ?? "Complete"}
            </button>
          )
        )}
      </div>
    </ElementWrapper>
  );
}

export function ElementWrapper(props: {
  children: React.ReactNode;
  theme: Theme;
}): React.JSX.Element {
  return (
    <div className={props.theme.classes.componentWrapper}>
      <div className={props.theme.classes.elementWrapper}>{props.children}</div>
    </div>
  );
}
