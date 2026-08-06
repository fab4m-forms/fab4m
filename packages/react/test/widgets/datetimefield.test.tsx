import * as React from "react";
import { fireEvent, waitFor, cleanup } from "@testing-library/react";
import {
  basic,
  createForm,
  dateTimeField,
  dateTimePickerWidget,
  generateSchema,
  SchemaEntry,
} from "@fab4m/fab4m";
import { FormComponentView } from "../../src/index";
import { renderWithProvider, inputElementOk } from "../util";

describe("date time field widget", () => {
  afterEach(cleanup);

  const component = dateTimeField({
    name: "datetime",
    label: "Date time field",
    required: true,
    widget: dateTimePickerWidget(),
    validators: [],
  });

  test("renders a native datetime-local input", () => {
    const { queryByLabelText } = renderWithProvider(
      <FormComponentView
        name="datetime"
        onChange={() => {}}
        component={component}
        theme={basic}
      />,
    );
    const input = queryByLabelText("Date time field") as HTMLInputElement;
    expect(input).not.toBeNull();
    expect(input.type).toBe("datetime-local");
    expect(input.name).toBe("datetime");
  });

  test("displays the value as YYYY-MM-DDTHH:mm", () => {
    const value = new Date("2020-01-01T05:20:00.000Z");
    const { queryByLabelText } = renderWithProvider(
      <FormComponentView
        name="datetime"
        onChange={() => {}}
        component={component}
        theme={basic}
        value={value}
      />,
    );
    const input = queryByLabelText("Date time field") as HTMLInputElement;
    expect(input.value).toBe("2020-01-01T05:20");
  });

  test("value round-trip: input change emits a Date", async () => {
    let data: Date | undefined = new Date();
    const changeData = (value: unknown) => {
      data = value as Date;
    };
    const { findByLabelText } = renderWithProvider(
      <FormComponentView
        name="datetime"
        onChange={changeData}
        component={component}
        theme={basic}
        value={data}
      />,
    );
    const element = (await findByLabelText(
      "Date time field",
    )) as HTMLInputElement;
    fireEvent.input(element, { target: { value: "2021-05-15T08:30" } });
    await waitFor(() => {
      expect(data?.getFullYear()).toBe(2021);
      expect(data?.getMonth()).toBe(4);
      expect(data?.getDate()).toBe(15);
      expect(data?.getHours()).toBe(8);
      expect(data?.getMinutes()).toBe(30);
    });
  });

  test("datetime schema", () => {
    const form = createForm();
    form.add(
      dateTimeField({
        name: "datetime",
        label: "Date time",
        required: true,
      }),
    );
    const schema = generateSchema(form);
    const dateSchema = schema.properties.datetime as SchemaEntry;
    expect(dateSchema.type).toBe("string");
    if (dateSchema.type === "string") {
      expect(dateSchema.format).toBe("date-time");
    }
  });

  inputElementOk(component, "datetime:");
});
