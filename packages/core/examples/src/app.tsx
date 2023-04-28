import * as React from "react";
import {
  createForm,
  basic,
  basicDark,
  bulma,
  textField,
  StatefulFormView,
  content,
  booleanField,
  textAreaWidget,
  fileField,
  integerField,
  emailField,
  group,
  fieldsetWidget,
  radiosWidget,
  FormComponentView,
  pageBreak,
  selectWidget,
  tagsWidget,
  Theme,
  maxLength,
  minLength,
  horizontalGroupWidget,
  detailsWidget,
  submit,
  fileSize,
  tailwind,
  textFieldWidget,
  createTailwindTheme,
} from "../../src/index";
import "./index.css";
import "../../src/themes/basic/basic.scss";
import { useState } from "react";

const themes: Record<string, Theme> = {
  bulma,
  basic,
  basicDark,
  tailwind,
  tailwindDark: tailwind,
  tailwindCustom: createTailwindTheme({
    settings: { primaryBg: "bg-red-600 hover:bg-green-900" },
  }),
};

export default function App() {
  const [selectedTheme, changeSelectedTheme] = useState("tailwind");
  const [darkMode, changeDarkMode] = useState(true);
  const theme = themes[selectedTheme] ?? tailwind;
  const form = createForm(
    {
      text: textField({
        label: "Text",
        description: "This field is has a magical description",
        required: true,
      }),
      prefixed: textField({
        label: "Text, prefixed",
        widget: textFieldWidget("Prefix"),
      }),
      checkbox: booleanField({ label: "Checkbox" }),
      options: textField({
        label: "Options",
        widget: radiosWidget([
          ["One", "one"],
          ["Two", "two"],
          ["Three", "three"],
          "four",
          "five",
          "six",
        ]),
      }),
      textarea: textField({
        label: "Text area",
        widget: textAreaWidget(),
        validators: [minLength(10)],
      }),
      file: fileField({
        label: "File",
        rules: [
          ["textarea", minLength(5)],
          ["textarea", maxLength(10)],
        ],
      }),
      number: integerField({ label: "Number" }),
      email: emailField({ label: "Email" }),
      content: content({}, (data: { email?: string }) => (
        <div>
          <h3>Content</h3>
          <div>{data.email}</div>
        </div>
      )),

      group: group(
        { label: "Group" },
        {
          in_group: textField({ label: "In group" }),
          another_in_group: textField({ label: "Another in group" }),
        }
      ),
      fieldset: group(
        { label: "Fieldset Group", widget: fieldsetWidget() },
        {
          in_group: textField({ name: "in_group", label: "In group" }),
          another_in_group: textField({
            name: "another_in_group",
            label: "Another in group",
          }),
        }
      ),
      multiple_group: group(
        {
          label: "Multiple Group",
          multiple: true,
          minItems: 1,
          widget: horizontalGroupWidget(),
        },
        {
          in_group: textField({ name: "in_group", label: "In group" }),
          another_in_group: textField({
            name: "another_in_group",
            label: "Another in group",
          }),
        }
      ),
      details_groups: group(
        {
          label: "Multiple Group",
          multiple: true,
          minItems: 1,
          widget: detailsWidget({
            summary: (data) => (
              <span>
                <strong>[{data?.another_in_group}]</strong> Whatever
              </span>
            ),
            open: true,
          }),
        },
        {
          in_group: textField({ name: "in_group", label: "In group" }),
          another_in_group: textField({
            name: "another_in_group",
            label: "Another in group",
          }),
        }
      ),
      multiple_text: textField({
        label: "Multiple text",
        minItems: 1,
        multiple: true,
      }),
      tags: textField({
        label: "Tags (required, two items)",
        description: "This is a long description that messes things up",
        minItems: 2,
        required: true,
        multiple: true,
        widget: selectWidget([
          ["One", "one"],
          ["Two", "two"],
        ]),
        multipleWidget: tagsWidget({
          addItemLabel: "Add this",
          removeItemLabel: "wat",
        }),
      }),
      tags_direct: textField({
        label: "Tags (without add)",
        //minItems: 1,
        multiple: true,
        widget: selectWidget([
          ["One", "one"],
          ["Two", "two"],
        ]),
        multipleWidget: tagsWidget({ addOnChange: true }),
      }),
      select: textField({
        label: "Select",
        widget: selectWidget([
          ["One", "one"],
          ["Two", "two"],
          "three",
          ["Group", ["gothenburg", ["Stockholm", "stockholm"]]],
        ]),
      }),
      tags_text: textField({
        label: "Tags text field",
        minItems: 1,
        multiple: true,
        multipleWidget: tagsWidget(),
      }),
      submit: submit({ name: "submit" }, { title: "Custom Submit" }),
    },
    {},
    theme
  );
  form.onSubmit((e, data) => {
    e.preventDefault();
  });
  const component = textField({
    name: "test_component",
    label: "Test component",
  });
  const multistep = createForm({}, {}, theme);

  multistep.add(textField({ name: "first_page", label: "First page" }));
  multistep.add(
    fileField({ name: "file", label: "File", validators: [fileSize(1)] })
  );
  multistep.add(pageBreak({ name: "first" }));
  multistep.add(
    textField({ name: "second_page", required: true, label: "Second page" })
  );
  multistep.add(pageBreak({ name: "second" }));
  multistep.add(textField({ name: "third_page", label: "Last page" }));

  const testForm = createForm({
    text: textField({
      label: "Wat wat",
      defaultValue: "test",
    }),
  }).onSubmit((e, data) => {
    e.preventDefault();
    console.log(data);
  });
  return (
    <React.StrictMode>
      <div
        className={`App ${darkMode ? "fab4m-dark" : ""}`}
        style={{ maxWidth: "900px", padding: "1em", margin: "0 auto" }}
      >
        <label className="label">Theme</label>

        <select
          onChange={(e) => {
            const value = e.currentTarget.value;
            if (value === "basicDark" || value === "tailwindDark") {
              changeDarkMode(true);
            } else {
              changeDarkMode(false);
            }
            changeSelectedTheme(value);
          }}
          value={selectedTheme}
        >
          <option value="bulma">Bulma</option>
          <option value="basic">Basic</option>
          <option value="basicDark">Basic, dark</option>
          <option value="tailwind">Tailwind</option>
          <option value="tailwindDark">Tailwind, dark</option>
        </select>
        <h2 className="title">Form Example</h2>
        <StatefulFormView
          form={form}
          errors={[
            { path: "/text", message: "This is an error" },
            { path: "/text", message: "This is another error" },
          ]}
        />
        <h2 className="title">Multistep form</h2>
        <StatefulFormView form={multistep} />

        <h2 className="title">Form for testing</h2>
        <StatefulFormView form={testForm} />
        <FormComponentView
          name="component"
          component={component}
          theme={basic}
          onChange={() => {}}
          errors={[
            { path: "test_component", message: "This is an example error" },
            {
              path: "test_component",
              message: "This is another example error",
            },
          ]}
        />
      </div>
    </React.StrictMode>
  );
}
