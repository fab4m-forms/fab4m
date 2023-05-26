import * as React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import {
  basic,
  createForm,
  FormComponentView,
  generateSchema,
  serialize,
  unserialize,
} from "@fab4m/fab4m";
import {
  dateField,
  dateFieldType,
  datePickerWidget,
  datePickerWidgetType,
  setLocales,
} from "../src";
import { format } from "date-fns";
import { enUS, sv, fi } from "date-fns/locale";

describe("date field", () => {
  const date = dateField({
    name: "textfield",
    label: "Date field",
    required: true,
    widget: datePickerWidget(),
    validators: [],
  });

  it("datepicker widget", async () => {
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
    const currentDateString = format(new Date(), "P");
    expect(element.value).toBe(currentDateString);
    fireEvent.input(element, {
      value: "2020-01-01",
      target: { value: "2020-01-01" },
    });
    await waitFor(async () => {
      expect(data.getFullYear()).toBe(2020);
      expect(data.getMonth()).toBe(0);
      expect(data.getDate()).toBe(1);
    });
  });

  it("date locale", async () => {
    const withLocale = {
      ...date,
      widget: {
        ...date.widget,
        settings: { locale: sv },
      },
    };
    let data = new Date();
    const { queryAllByDisplayValue } = render(
      <FormComponentView
        name="textfield"
        onChange={() => {}}
        component={withLocale}
        theme={basic}
        value={data}
      />
    );
    expect(
      queryAllByDisplayValue(format(data, "P", { locale: sv }))
    ).toHaveLength(2);
  });

  it("date locale fallback", async () => {
    const field = dateField({
      name: "date",
      label: "Date",
      widget: datePickerWidget({
        locales: [sv, fi],
        useBrowserLocale: true,
      }),
    });
    const date = new Date();
    const { queryByLabelText } = render(
      <FormComponentView
        name="date"
        onChange={() => {}}
        component={field}
        theme={basic}
        value={date}
      />
    );
    expect((queryByLabelText("Date") as HTMLInputElement).value).toBe(
      format(date, "yyyy-MM-dd")
    );
  });
  it("custom format", async () => {
    const withFormat = {
      ...date,
      widget: {
        ...date.widget,
        settings: { format: "yyyy" },
      },
    };
    let data = new Date();
    const { queryByDisplayValue } = render(
      <FormComponentView
        name="textfield"
        onChange={() => {}}
        component={withFormat}
        theme={basic}
        value={data}
      />
    );
    expect(queryByDisplayValue(format(data, "yyyy"))).not.toBeNull();
  });

  it("date schema", () => {
    const form = createForm();
    form.add(
      dateField({
        name: "date",
        label: "Date",
        required: true,
      })
    );
    const schema = generateSchema(form);
    const dateSchema = schema.properties.date;
    expect(dateSchema.type).toBe("string");
    if (dateSchema.type === "string") {
      expect(dateSchema.format).toBe("date");
    }
  });

  it("datepicker properties", () => {
    const customSettings = {
      ...date,
      widget: {
        ...date.widget,
        settings: { datePickerProps: { inline: true } },
      },
    };
    let data = new Date();
    const { queryByText } = render(
      <FormComponentView
        name="withSettings"
        onChange={() => {}}
        component={customSettings}
        theme={basic}
        value={data}
      />
    );
    // Check if monday is visible.
    expect(queryByText("Mo")).toBeVisible();
  });

  it("datepicker settings as a function", () => {
    const customSettings = {
      ...date,
      widget: {
        ...date.widget,
        settings: {
          datePickerProps: (value) => ({
            inline: true,
            openToDate: !value ? new Date("1990-01-01") : undefined,
          }),
        },
      },
    };
    const withoutValue = render(
      <FormComponentView
        name="withSettings"
        onChange={() => {}}
        component={customSettings}
        theme={basic}
        value={undefined}
      />
    );
    // Check if 1990 is visible.
    expect(withoutValue.queryByText("1990", { exact: false })).toBeVisible();
    const currentDate = new Date();
    const withValue = render(
      <FormComponentView
        name="withSettings"
        onChange={() => {}}
        component={customSettings}
        theme={basic}
        value={currentDate}
      />
    );
    // The current year should be visible.
    expect(
      withValue.queryByText(currentDate.getFullYear(), { exact: false })
    ).toBeVisible();
  });

  it("date widget serialization", () => {
    const form = createForm();
    form.add(
      dateField({
        name: "date",
        label: "Date",
        required: true,
        widget: datePickerWidget({
          locale: sv,
          useBrowserLocale: true,
          locales: [sv, enUS],
        }),
      })
    );
    setLocales([sv, enUS]);
    const serialized = serialize(form);
    const widget = serialized.components[0].widget;
    const settings = widget.settings as Record<string, unknown>;
    expect(widget.type).toBe("datepicker");
    expect(settings.locale).toBe("sv");
    const locales = settings.locales as string[];
    expect(locales[0]).toBe("sv");
    expect(locales[1]).toBe("en-US");
    const unserialized = unserialize(
      serialized,
      [dateFieldType],
      [basic],
      [datePickerWidgetType]
    );
    expect(unserialized.components[0].widget.settings.locale).toBe(sv);
    expect(unserialized.components[0].widget.settings.locales).toStrictEqual([
      sv,
      enUS,
    ]);
  });
});
