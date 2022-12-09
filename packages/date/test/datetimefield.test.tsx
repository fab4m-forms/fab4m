import * as React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import {
  basic,
  createForm,
  FormComponentView,
  generateSchema,
  serialize,
} from "fab4m";
import { dateTimeField, dateTimePickerWidget } from "../src";
import { format } from "date-fns";
import { enUS, sv } from "date-fns/locale";

describe("date time field", () => {
  const date = dateTimeField({
    name: "textfield",
    label: "Date field",
    required: true,
    validators: [],
  });

  test("datepicker widget", async () => {
    let data = new Date();
    const changeData = (value: unknown) => {
      data = value as Date;
    };
    const { findByLabelText } = render(
      <FormComponentView
        name="textfield"
        onChange={changeData}
        component={date}
        theme={basic}
        value={data}
      />
    );
    const element = (await findByLabelText("Date field")) as HTMLInputElement;
    const currentDateString = format(new Date(), "Pp");
    expect(element.value).toBe(currentDateString);
    fireEvent.input(element, {
      value: "2020-01-01 05:20",
      target: { value: "2020-01-01 05:20" },
    });
    await waitFor(async () => {
      expect(data.getFullYear()).toBe(2020);
      expect(data.getMonth()).toBe(0);
      expect(data.getDate()).toBe(1);
      expect(data.getHours()).toBe(5);
      expect(data.getMinutes()).toBe(20);
    });
  });

  test("datetime schema", () => {
    const form = createForm();
    form.add(
      dateTimeField({
        name: "date",
        label: "Date",
        required: true,
      })
    );
    const schema = generateSchema(form);
    const dateSchema = schema.properties.date;
    expect(dateSchema.type).toBe("string");
    if (dateSchema.type === "string") {
      expect(dateSchema.format).toBe("date-time");
    }
  });

  test("datetime widget serialization", () => {
    const form = createForm();
    form.add(
      dateTimeField({
        name: "date",
        label: "Date",
        required: true,
        widget: dateTimePickerWidget({
          locale: sv,
          useBrowserLocale: true,
          locales: [sv, enUS],
        }),
      })
    );
    const serialized = serialize(form);
    const widget = serialized.components[0].widget;
    const settings = widget.settings as Record<string, unknown>;
    expect(widget.type).toBe("dateTimePicker");
    expect(settings.locale).toBe("sv");
    const locales = settings.locales as string[];
    expect(locales[0]).toBe("sv");
    expect(locales[1]).toBe("en-US");
  });
});
