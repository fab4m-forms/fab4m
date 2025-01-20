import * as React from "react";
/**
 * @internal
 */
export default function FormElement({
  id,
  label,
  children,
  required,
  requiredText,
  labelWrapperClass = "title-wrapper",
  childrenClass = "control",
  labelClass = "form-label",
  requiredClass = "required-indicator",
}: {
  id: string;
  label?: string;
  children: React.ReactNode;
  labelClass?: string;
  required: boolean;
  requiredText: string;
  wrapperClass?: string;
  labelWrapperClass: string;
  childrenClass?: string;
  requiredClass?: string;
}): React.JSX.Element {
  return (
    <>
      <div className={labelWrapperClass}>
        {label && (
          <label className={labelClass} htmlFor={id}>
            <span>{label}</span>
          </label>
        )}
        {label && required && (
          <span className={requiredClass} aria-label={requiredText}>
            *
          </span>
        )}
      </div>
      <div className={childrenClass}>{children}</div>
    </>
  );
}
