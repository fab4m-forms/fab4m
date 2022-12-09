import * as React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { basic, textField, radiosWidget, integerField } from "../../src";
import FormComponentView from "../../src/components/FormComponentView";

describe("Radios", () => {
  const field = textField({
    name: "text_options",
    label: "Text options",
    required: true,
    widget: radiosWidget<string>([["One", "one"], ["Two", "two"], "three"]),
  });
  const numbers = integerField({
    name: "numbers",
    label: "Numbers",
    widget: radiosWidget<number>([
      ["Zero", 0],
      ["One", 1],
    ]),
  });
  test("radio choice", async () => {
    let data = "";
    const changeData = (value: unknown) => {
      data = value as string;
    };
    const component = () => (
      <FormComponentView
        name="text_options"
        theme={basic}
        onChange={changeData}
        component={field}
        value={data}
      />
    );

    const { findByLabelText, rerender } = render(component());
    const firstElement = (await findByLabelText("One")) as HTMLInputElement;
    const secondElement = (await findByLabelText("Two")) as HTMLInputElement;
    const thirdElement = (await findByLabelText("three")) as HTMLInputElement;
    expect(firstElement.checked).toBe(false);
    fireEvent.click(firstElement);
    await waitFor(() => {
      expect(data).toBe("one");
      rerender(component());
      expect(firstElement.checked).toBe(true);
    });
    fireEvent.click(secondElement);
    await waitFor(() => {
      expect(data).toBe("two");
      rerender(component());
      expect(firstElement.checked).toBe(false);
      expect(secondElement.checked).toBe(true);
    });
    fireEvent.click(thirdElement);
    await waitFor(() => {
      expect(data).toBe("three");
      rerender(component());
      expect(thirdElement.checked).toBe(true);
    });
  });
  test("Numbers choice", async () => {
    let data = 0;
    const changeData = (value: unknown) => {
      data = value as number;
    };
    const { findByLabelText } = render(
      <FormComponentView
        name="numbers"
        theme={basic}
        onChange={changeData}
        component={numbers}
        value={data}
      />
    );
    const zeroElement = (await findByLabelText("Zero")) as HTMLInputElement;
    const oneElement = (await findByLabelText("One")) as HTMLInputElement;
    expect(zeroElement.checked).toBe(true);
    expect(oneElement.checked).toBe(false);
  });
});
