import React from "react";
import {
  booleanField,
  content,
  createForm,
  equals,
  exists,
  group,
  hiddenFieldWidget,
  integerField,
  selectWidget,
  serializeComponent,
  SerializedComponent,
  tailwind,
  textAreaField,
  tableWidget,
  textField,
  textFieldWidget,
  VariantDefinition,
} from "@fab4m/fab4m";
import {
  findComponentValidators,
  findComponentWidgets,
  findPlugin,
} from "../util";
import { FormComponentTypePlugin, Plugins } from "..";
import invariant from "tiny-invariant";
import t from "../translations";

export interface ComponentData {
  label: string;
  name: string;
  required: boolean;
  description?: string;
  multiple: boolean;
  minItems?: number;
  maxItems?: number;
  actions: unknown;
  settings?: Record<string, unknown>;
  widget: string;
  validators: Array<{ type: string; settings: unknown }>;
  rules: Array<{
    component: string;
    rule: string;
    settings: unknown | undefined;
  }>;
  widgetSettings?: Record<string, unknown>;
}

export function componentFromFormData(
  type: FormComponentTypePlugin,
  plugins: Plugins,
  data: ComponentData,
): SerializedComponent {
  const widget = findPlugin(data.widget, plugins.widgets);
  invariant(widget.type.init);
  const serializedComponent = serializeComponent({
    ...data,
    type: type.type,
    widget: widget.type.init(),
    rules: [],
    validators: [],
    settings: undefined,
  });
  serializedComponent.settings = data.settings;
  if (data.widgetSettings) {
    serializedComponent.widget.settings = widget.settingsFromForm
      ? widget.settingsFromForm(data.widgetSettings)
      : data.widgetSettings;
  }
  serializedComponent.validators = data.validators.map((validator) => {
    const plugin = findPlugin(validator.type, plugins.validators);
    return {
      type: validator.type,
      settings: plugin.settingsFromForm
        ? plugin.settingsFromForm(validator.settings)
        : validator.settings,
    };
  });

  serializedComponent.rules = data.rules.map((rule) => {
    const plugin = findPlugin(rule.rule, plugins.validators);
    return [
      rule.component,
      {
        type: plugin.type.name,
        settings: plugin.settingsFromForm
          ? plugin.settingsFromForm(rule.settings)
          : undefined,
      },
    ];
  });
  return serializedComponent;
}

export function componentForm(args: {
  type: FormComponentTypePlugin;
  plugins: Plugins;
  components: SerializedComponent[];
  component?: SerializedComponent;
  withMachineName?: boolean;
}) {
  const components = args.components;
  const validators = findComponentValidators(
    args.type.type.name,
    args.plugins.validators,
  );

  const settingsForm = args.type.editForm
    ? group(
        {
          label: t("componentSettings"),
        },
        args.type.editForm(),
      )
    : undefined;
  const widgetSettingsForm = findComponentWidgets(
    args.type.type.name,
    args.plugins.widgets,
  )
    .filter((plugin) => plugin.editForm)
    .map((plugin): VariantDefinition => {
      invariant(plugin.editForm);
      return [
        "widget",
        equals(plugin.type.name),
        group(
          {
            label: t("widgetSettings"),
          },
          plugin.editForm(),
        ),
      ];
    });

  const validatorFormItems: VariantDefinition[] = args.plugins.validators
    .filter((plugin) => plugin.component)
    .map((plugin) => {
      invariant(plugin.component);
      return [
        "validators.$.type",
        equals(plugin.type.name),
        { ...plugin.component(), label: t("value") },
      ];
    });

  const ruleFormItems: VariantDefinition[] = args.plugins.validators
    .filter((plugin) => plugin.component)
    .map((plugin) => {
      invariant(plugin.component);
      return [
        "rules.$.rule",
        equals(plugin.type.name),
        { ...plugin.component(), required: true, label: t("value") },
      ];
    });
  return createForm<ComponentData>(
    {
      label: textField({
        required: true,
        label: t("label"),
      }),
      name: textField({
        required: true,
        label: t("machineName"),
        widget: args.withMachineName ? textFieldWidget() : hiddenFieldWidget(),
      }),
      required: booleanField({
        label: t("required"),
      }),
      description: textAreaField({
        label: t("description"),
      }),
      multiple: booleanField({
        label: t("multiple"),
      }),
      minItems: integerField({
        label: t("minItems"),
        rules: [["multiple", exists()]],
      }),
      maxItems: integerField({
        label: t("maxItems"),
        rules: [["multiple", exists()]],
      }),
      settings: settingsForm ?? undefined,
      widget: textField({
        label: "Widget",
        required: true,
        widget: selectWidget(
          findComponentWidgets(args.type.type.name, args.plugins.widgets).map(
            (widget) => [widget.type.title, widget.type.name],
          ),
        ),
      }),
      widgetSettings: widgetSettingsForm,
      validators: group(
        {
          label: t("validators"),
          multiple: true,
          minItems: 1,
          multipleWidget: tableWidget({
            addItemLabel: t("addValidator"),
            headerColumn: ({ index, props }) => (
              <th
                {...props}
                className={
                  index === 0 ? `${props.className} w-[200px]` : props.className
                }
              />
            ),
            rowColumn: ({ props, component }) => (
              <td
                {...props}
                className={`p-2 text-center ${component.type.name} ${
                  component.type.name === "content"
                    ? "align-middle"
                    : "align-top"
                }`}
              />
            ),
          }),
        },
        {
          type: textField({
            label: t("validatorType"),
            required: true,
            widget: selectWidget(
              validators.map((plugin) => [plugin.type.title, plugin.type.name]),
            ),
          }),
          settings: [
            ...validatorFormItems,
            ["validators.$.type", exists(), content({}, () => t("na"))],
          ],
        },
      ),
      rules: group(
        {
          label: t("rules"),
          multiple: true,
          multipleWidget: tableWidget({ addItemLabel: t("addRule") }),
        },
        {
          component: textField({
            label: t("component"),
            required: true,
            widget: selectWidget(
              components.map((component) => [
                component.label ?? component.name ?? "",
                component.name ?? "",
              ]),
            ),
          }),
          rule: components.map((component) => [
            "rules.$.component",
            equals(component.name ?? ""),
            textField({
              label: t("rule"),
              widget: selectWidget(
                findComponentValidators(
                  component.type,
                  args.plugins.validators,
                ).map((plugin) => [plugin.type.title, plugin.type.name]),
              ),
            }),
          ]),
          settings: [
            ...ruleFormItems,
            ["rules.$.rule", exists(), content({}, () => <>{t("na")}</>)],
          ],
        },
      ),
    },
    { theme: tailwind },
  );
}
