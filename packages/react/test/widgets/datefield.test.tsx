import * as React from "react";
import { fireEvent, waitFor, cleanup } from "@testing-library/react";
import {
  basic,
  createForm,
  dateField,
  datePickerWidget,
  generateSchema,
  SchemaEntry,
} from "@fab4m/fab4m";
import { FormComponentView } from "../../src/index";
import { renderWithProvider, inputElementOk } from "../util";

describe("date field widget", () => {
  afterEach(cleanup);

  const component = dateField({
    name: "date",
    label: "Date field",
    required: true,
    widget: datePickerWidget(),
    validators: [],
  });

  test("renders a native date input", () => {
    const { queryByLabelText } = renderWithProvider(
      <FormComponentView
        name="date"
        onChange={() => {}}
        component={component}
        theme={basic}
      />,
    );
    const input = queryByLabelText("Date field") as HTMLInputElement;
    expect(input).not.toBeNull();
    expect(input.type).toBe("date");
    expect(input.name).toBe("date");
  });

  test("displays the value as YYYY-MM-DD", () => {
    const value = new Date("2020-01-01T00:00:00.000Z");
    const { queryByLabelText } = renderWithProvider(
      <FormComponentView
        name="date"
        onChange={() => {}}
        component={component}
        theme={basic}
        value={value}
      />,
    );
    const input = queryByLabelText("Date field") as HTMLInputElement;
    expect(input.value).toBe("2020-01-01");
  });

  test("value round-trip: input change emits a Date", async () => {
    let data: Date | undefined = new Date();
    const changeData = (value: unknown) => {
      data = value as Date;
    };
    const { findByLabelText } = renderWithProvider(
      <FormComponentView
        name="date"
        onChange={changeData}
        component={component}
        theme={basic}
        value={data}
      />,
    );
    const element = (await findByLabelText("Date field")) as HTMLInputElement;
    fireEvent.input(element, { target: { value: "2021-05-15" } });
    await waitFor(() => {
      expect(data?.toISOString().slice(0, 10)).toBe("2021-05-15");
    });
  });
  inputElementOk(component, "date:");
});
