import * as React from "react";
import { fireEvent, waitFor } from "@testing-library/react";
import { basic, emailField, emailWidget } from "@fab4m/fab4m";
import { FormComponentView } from "../../src/index";
import { inputElementOk, renderWithProvider } from "../util";
import { FormProvider } from "../../src/index";
import { allWidgetsRenderer } from "../../src/index";

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
    const { container, rerender } = renderWithProvider(component());
    const element = container.querySelector("input");
    if (element) {
      expect(element.value).toBe("email@email.com");
      fireEvent.input(element, {
        value: "otheremail@email.com",
        target: { value: "otheremail@email.com" },
      });
      await waitFor(() => {
        expect(data).toBe("otheremail@email.com");
        rerender(
          <FormProvider renderer={allWidgetsRenderer}>{component()}</FormProvider>,
        );
        expect(element.value).toBe("otheremail@email.com");
      });
    }
  });
  inputElementOk(email, "email:");
});
