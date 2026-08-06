import {
  createForm,
  dateField,
  dateRangeField,
  dateRangePickerWidget,
  dateTimeField,
  generateSchema,
  SchemaEntry,
} from "../src";

describe("date component serialization and schema", () => {
  describe("date field", () => {
    test("schema produces date format", () => {
      const form = createForm();
      form.add(
        dateField({
          name: "date",
          label: "Date",
          required: true,
        }),
      );
      const schema = generateSchema(form);
      const dateSchema = schema.properties.date as SchemaEntry;
      expect(dateSchema.type).toBe("string");
      if (dateSchema.type === "string") {
        expect(dateSchema.format).toBe("date");
      }
    });
  });

  describe("datetime field", () => {
    test("schema produces date-time format", () => {
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
  });

  describe("date range field", () => {
    test("schema produces object with from/to date-time properties", () => {
      const form = createForm();
      form.add(
        dateRangeField({
          name: "range",
          label: "Date range",
          required: true,
        }),
      );
      const schema = generateSchema(form);
      const rangeSchema = schema.properties.range as Record<string, unknown>;
      expect(rangeSchema.type).toBe("object");
      const properties = rangeSchema.properties as Record<
        string,
        { type: string; format: string }
      >;
      expect(properties.from.type).toBe("string");
      expect(properties.from.format).toBe("date-time");
      expect(properties.to.type).toBe("string");
      expect(properties.to.format).toBe("date-time");
      expect(rangeSchema.required).toEqual(["from"]);
    });
  });

  describe("widget factories", () => {
    test("dateRangePickerWidget creates a range widget with defaults", () => {
      const w = dateRangePickerWidget();
      expect(w.type.name).toBe("dateRangePicker");
      expect(w.settings.fromLabel).toBe("From");
      expect(w.settings.toLabel).toBe("To");
    });

    test("dateRangePickerWidget accepts custom settings", () => {
      const w = dateRangePickerWidget({
        fromLabel: "Start",
        toLabel: "End",
        withTime: true,
      });
      expect(w.settings.fromLabel).toBe("Start");
      expect(w.settings.toLabel).toBe("End");
      expect(w.settings.withTime).toBe(true);
    });
  });
});
