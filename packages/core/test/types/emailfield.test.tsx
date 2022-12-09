import * as React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import {
  basic,
  createForm,
  emailField,
  emailWidget,
  FormComponentWithName,
} from "../../src";
import FormComponentView from "../../src/components/FormComponentView";
import { validate } from "../../src/schemaValidator";
import { inputElementOk } from "../util";

describe("Email field", () => {
  const email = emailField({
    name: "required_text",
    label: "Required text",
    required: true,
    widget: emailWidget(),
    validators: [],
  });
  test("email field widget and data", async () => {
    let data = "email@email.com";
    const changeData = (value: unknown) => {
      data = value as string;
    };
    const component = () => (
      <FormComponentView
        name="required_text"
        theme={basic}
        onChange={changeData}
        component={email}
        value={data}
      />
    );
    const { container, rerender } = render(component());
    const element = container.querySelector("input");
    if (element) {
      expect(element.value).toBe("email@email.com");
      fireEvent.input(element, {
        value: "otheremail@email.com",
        target: { value: "otheremail@email.com" },
      });
      await waitFor(() => {
        expect(data).toBe("otheremail@email.com");
        rerender(component());
        expect(element.value).toBe("otheremail@email.com");
      });
    }
  });
  test("schema validation", async () => {
    const form = createForm();
    form.add(email as FormComponentWithName);
    const invalid = validate(form, { required_text: "not-an-email" });
    expect(invalid.valid).toBe(false);
    const valid = validate(form, { required_text: "test@example.com" });
    expect(valid.valid).toBe(true);
  });
  inputElementOk(email, "email:");
});
