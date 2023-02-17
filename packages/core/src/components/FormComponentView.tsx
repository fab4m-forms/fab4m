import * as React from "react";
import ValidatorInfo from "./ValidatorInfo";
import { attributes, FormComponent } from "../component";
import ValidationErrors from "./ValidationErrors";
import { Theme } from "../theme";
import Multiple from "../widgets/multiple/Multiple";
import { ValidationError } from "../validator";
import { Labels } from "../form";
/**
 * Render a stand-alone component.
 * @parma propps the component properties.
 * @group React API
 */
export default function FormComponentView(props: {
  /** The current component value. */
  value?: unknown;
  /**
   * This event is triggered every time the component value is updated.
   * @param value the updated value.
   */
  onChange: (value: unknown) => void;
  /**
   * A list of errors that should be presented for the component.
   */
  errors?: ValidationError[];
  /**
   * The form theme that is being used.
   */
  theme: Theme;
  /**
   * Set this to true to optimize for server side rendering.
   */
  ssr?: boolean;
  /**
   * If this component is rendered as one of multiple items, Provide the current index in the list.
   */
  index?: number;
  /**
   * The name that should be applied to the form element.
   */
  name: string;
  /**
   * The id that should be applied to the form element.
   */
  id?: string;
  /**
   * A set of labels to be used.
   */
  labels?: Labels;
  /**
   * Attributes that should be passed along to the form element in this widget.
   */
  attributes?: Record<string, string | number | boolean>;
  /**
   * Hide the label for this component.
   */
  hideLabel?: boolean;
  /**
   * Hide the description for this component.
   */
  hideDescription?: boolean;
  /**The Component that should be rendered.*/
  component: FormComponent;
}): JSX.Element {
  const widgetAttributes = {
    ...(props.attributes ?? {}),
    ...attributes(props.component),
  };
  const id = props.id ?? props.name;
  if (props.component.multiple && typeof props.index === "undefined") {
    const MultipleWidget = props.component.multipleWidget
      ? props.component.multipleWidget.type.widget
      : Multiple;

    return (
      <MultipleWidget
        component={props.component}
        value={props.value as unknown[]}
        settings={props.component.multipleWidget?.settings}
        onChange={props.onChange}
        errors={props.errors}
        ssr={!!props.ssr}
        id={id}
        labels={props.labels}
        name={props.name}
        attributes={widgetAttributes}
        theme={props.theme}
      />
    );
  }
  return (
    <div className={props.theme.classes.componentWrapper}>
      <props.component.widget.type.widget
        component={props.component}
        value={props.value}
        settings={props.component.widget.settings}
        onChange={props.onChange}
        errors={props.errors}
        ssr={!!props.ssr}
        labels={props.labels}
        hideLabel={props.hideLabel}
        id={id}
        name={props.name ?? props.component.name}
        index={props.index}
        attributes={widgetAttributes}
        theme={props.theme}
      />
      {props.component.description && !props.hideDescription && (
        <div className={props.theme.classes.description}>
          {props.component.description}
        </div>
      )}
      {props.errors && props.errors.length > 0 && (
        <ValidationErrors
          errors={props.errors.filter((e) => e.path.length === 0)}
          classes={props.theme.classes}
        />
      )}
      <ValidatorInfo
        theme={props.theme}
        component={props.component}
        value={props.value}
      />
    </div>
  );
}
