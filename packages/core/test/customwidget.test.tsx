import "@testing-library/jest-dom";
import {
  textField,
  createForm,
  StatefulFormView,
  FormComponentView,
  customWidget,
  customMultipleWidget,
} from "../src";
import { render } from "@testing-library/react";

describe("Custom widget", () => {
  const form = createForm({
    field: textField({
      label: "Field",
      widget: customWidget((props) => (
        <div>
          <label htmlFor={props.id}>{props.component.label}</label>
          <input
            type="text"
            id={props.id}
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
          />
          <div>Custom text</div>
        </div>
      )),
    }),
    multipleField: textField({
      label: "Multiple field",
      multiple: true,
      multipleWidget: customMultipleWidget((props) => {
        return (
          <div>
            <div>Custom multiple text</div>
            {props.value?.map((itemValue, i) => (
              <div key={i}>
                <label htmlFor={`${props.id}_${i}`}>
                  {props.component.label} {i}
                </label>
                <FormComponentView
                  component={props.component}
                  index={i}
                  value={itemValue}
                  hideLabel={true}
                  id={`${props.id}_${i}`}
                  name={props.name}
                  theme={props.theme}
                  onChange={props.onChange}
                />
              </div>
            ))}
          </div>
        );
      }),
    }),
  });
  test("Custom widget", async () => {
    const { findByLabelText, findByText } = render(
      <StatefulFormView form={form} />
    );
    expect(await findByLabelText("Field")).toHaveAttribute("id", "field");
    expect(await findByText("Custom text")).toBeVisible();
  });

  test("Custom multiple widget", async () => {
    const value = {
      field: "Test",
      multipleField: ["Test 1", "Test 2"],
    };
    const { findByLabelText, findByText } = render(
      <StatefulFormView form={form} data={value} />
    );
    expect(await findByText("Custom multiple text")).toBeVisible();
    expect(await findByLabelText("Multiple field 0")).toHaveValue("Test 1");
    expect(await findByLabelText("Multiple field 1")).toHaveValue("Test 2");
  });
});
