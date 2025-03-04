import * as React from "react";
/**
 * The check icon renders a checkmark icon.
 * @group Iocns
 */
export default function CheckIcon(props: {
  className: string;
}): React.JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      className={props.className}
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path
        fill="green"
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
      />
    </svg>
  );
}
