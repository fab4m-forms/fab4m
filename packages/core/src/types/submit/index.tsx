import * as React from "react";
import {
  FormComponentType,
  CreateFormComponentType,
  formComponent,
  FormComponent,
} from "../../component";
import { Widget, widget, WidgetProps, WidgetType } from "../../widget";

/**
 * Settings for the submit widget.
 * @group Widgets
 */
export interface SubmitWidgetSettings {
  title: string;
}

type SubmitWidgetType = WidgetType<unknown, SubmitWidgetSettings>;
type SubmitWidget = Widget<unknown, SubmitWidgetSettings>;

/**
 * The Submit component type allows you to place a submit button anywhere in the form.
 * @group Components
 */
export const submitType: FormComponentType = {
  name: "submit",
  title: "Submit button",
  description: "A submit button that can be placed anywhere in the form.",
};

/**
 * The Submit component allows you to place a submit button anywhere in the form.
 * @group Components
 */
export function submit(
  attributes: CreateFormComponentType<unknown>,
  settings: SubmitWidgetSettings,
): FormComponent<unknown> {
  return formComponent({
    widget: submitWidget(settings),
    settings: undefined,
    ...attributes,
    type: submitType,
  });
}

/**
 * @group React widgets
 */
function Submit(
  props: WidgetProps<unknown, SubmitWidgetSettings>,
): React.ReactElement {
  return (
    <input
      className={props.theme.classes.submitButton}
      type="submit"
      value={props.settings.title}
      name={props.name}
    />
  );
}

/**
 * The submit widget type renders a submit input element.
 * @group Widgets
 */
export const submitWidgetType: SubmitWidgetType = {
  name: "submit",
  title: "Submit button",
  components: ["submit"],
  widget: Submit,
};

/**
 * The submit widget renders a submit input element.
 *
 * See [the submit component](/docs/components/submit)
 *
 * @group Widgets
 */
export function submitWidget(settings: SubmitWidgetSettings): SubmitWidget {
  return widget<unknown, SubmitWidgetSettings>({
    type: {
      name: "content",
      title: "Content",
      components: ["content"],
      widget: Submit,
    },
    settings: settings,
  });
}
