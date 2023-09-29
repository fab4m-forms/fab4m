import * as React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import {
  integerField,
  /*floatField,*/ numberFieldWidget,
  basic,
  floatField,
} from "../../src";
import { inputElementOk } from "../util";
import FormComponentView from "../../src/components/FormComponentView";

describe("number field", () => {
  const integer = integerField({
    name: "integer",
    label: "Integer field",
    required: true,
    widget: numberFieldWidget("This is a prefix"),
    validators: [],
  });

  const float = floatField({
    name: "float",
    label: "Float field",
    required: true,
    validators: [],
  });

  test("integer field", async () => {
    let data = 0;
    const changeData = (value: unknown) => {
      data = value as number;
    };
    const { findByLabelText } = render(
      <FormComponentView
        name="integer"
        onChange={changeData}
        component={integer}
        theme={basic}
        value={data}
      />,
    );
    const element = (await findByLabelText(
      "Integer field",
    )) as HTMLInputElement;
    expect(element.value).toBe("0");
    fireEvent.input(element, {
      value: "50",
      target: { value: "50" },
    });
    await waitFor(async () => {
      expect(data).toBe(50);
      expect(element.value).toBe("50");
    });
    fireEvent.input(element, {
      value: "50.5",
      target: { value: "50.5" },
    });
    await waitFor(async () => {
      expect(data).toBe(50);
    });
  });
  test("float field", async () => {
    let data = 10;
    const changeData = (value: unknown) => {
      data = value as number;
    };
    const { findByLabelText } = render(
      <FormComponentView
        name="float"
        onChange={changeData}
        component={float}
        theme={basic}
        value={data}
      />,
    );
    const element = (await findByLabelText("Float field")) as HTMLInputElement;
    expect(element.value).toBe("10");
    fireEvent.input(element, {
      value: "50.5",
      target: { value: "50.5" },
    });
    await waitFor(async () => {
      expect(element.value).toBe("50.5");
      expect(data).toBe(50.5);
    });
  });
  inputElementOk(integer, "integer:");
  inputElementOk(float, "float:");
});
