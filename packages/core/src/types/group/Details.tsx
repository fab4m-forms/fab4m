import * as React from "react";
import { DetailsSettings, WidgetProps } from "../..";
import GroupChildren from "./GroupChildren";

/**
 * Render a details widget with the group of fields.
 * The summary part can either be a string or any phrasing html content
 * in the form of react components.
 * @group React widgets
 */
export default function Details<DataType = Record<string, any>>(
  props: WidgetProps<DataType, DetailsSettings<DataType>>
): JSX.Element | null {
  if (!props.component.components) {
    return null;
  }
  let summary: string | undefined | React.ReactNode = props.component.label;
  if (props.settings.summary) {
    summary =
      typeof props.settings.summary === "function"
        ? props.settings.summary(props.value)
        : props.settings.summary;
  }
  return (
    <details
      open={props.settings.open}
      id={props.id}
      className={props.theme.classes.details}
    >
      <summary className={props.theme.classes.summary}>{summary}</summary>
      <div className={props.theme.classes.detailsContent}>
        <GroupChildren {...(props as WidgetProps<unknown, unknown>)} />
      </div>
    </details>
  );
}
