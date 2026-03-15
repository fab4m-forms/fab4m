import * as React from "react";
import { WidgetProps } from "@fab4m/fab4m";
import { FormComponentWrapper } from "../components/FormComponentWrapper";

/**
 * A react component that renders an input with the type "file".
 * @group React widgets
 */
export function UploadField(
  props: WidgetProps<File, unknown | undefined>,
): React.JSX.Element {
  const component = props.component;
  const classes = props.theme.classes;

  const changeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      props.onChange(file);
    }
  };
  return (
    <FormComponentWrapper {...props}>
      <input
        type="file"
        className={classes.fileInput}
        disabled={component.disabled}
        required={component.required}
        onChange={changeFile}
        name={props.name}
        id={props.id}
        {...props.attributes}
      />
    </FormComponentWrapper>
  );
}
