import React from "react";
import { SerializedComponent, StatefulFormView, useForm } from "@fab4m/fab4m";
import { componentForm, componentFromFormData } from "../forms/component";
import { useFormBuilder } from "../context";
import { FormComponentTypePlugin } from "..";
import { findPlugin } from "../util";

type ComponentFormProps = {
  type: FormComponentTypePlugin;
  component: SerializedComponent;
  componentChanged: (component: SerializedComponent) => void;
};
export function ComponentForm(props: ComponentFormProps) {
  const { plugins, form } = useFormBuilder();

  const component = props.component;
  const widgetPlugin = findPlugin(component.widget.type, plugins.widgets);
  const formInstance = useForm(
    () =>
      componentForm({
        type: props.type,
        plugins,
        components: form.components.filter(
          (c) => !Array.isArray(c),
        ) as SerializedComponent[],
      }),
    [props.type],
  ).onSubmit((e, data) => {
    e.preventDefault();
    props.componentChanged(componentFromFormData(props.type, plugins, data));
  });
  return (
    <StatefulFormView
      form={formInstance}
      data={{
        label: component.label,
        name: component.name,
        required: component.required,
        description: component.description,
        widget: component.widget.type,
        validators: component.validators.map((validator) => {
          const plugin = findPlugin(validator.type, plugins.validators);
          return {
            type: validator.type,
            settings: plugin.formData
              ? plugin.formData(validator.settings)
              : validator.settings,
          };
        }),
        rules: component.rules.map((rule) => {
          if (!Array.isArray(rule)) {
            throw new Error("Unexpected rule");
          }
          const plugin = findPlugin(rule[1].type, plugins.validators);
          return {
            component: rule[0],
            rule: rule[1].type,
            settings: plugin.formData
              ? plugin.formData(rule[1].settings)
              : rule[1].settings,
          };
        }),
        widgetSettings: widgetPlugin.formData
          ? widgetPlugin.formData(component.widget.settings)
          : (component.widget.settings as Record<string, unknown>),
      }}
    />
  );
}
