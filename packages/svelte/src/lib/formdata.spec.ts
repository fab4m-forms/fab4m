import { describe, it, expect } from "vitest";
import {
  booleanField,
  createForm,
  integerField,
  textField,
  group,
  fromFormData,
  equals,
  formDataDefinition,
  type Components,
} from "@fab4m/fab4m";

describe("Form data unpacking", () => {
  const fields: Components<Record<string, unknown>> = {
    string: textField({
      label: "String",
    }),
    number: integerField({
      label: "Number",
    }),
    bool: booleanField({
      label: "Boolean",
    }),
    multipleString: textField({
      label: "Multiple string",
      multiple: true,
    }),
    multipleNumber: integerField({
      label: "Multiple number",
      multiple: true,
    }),
    conditional: [
      [
        "string",
        equals("test"),
        textField({
          label: "Variant 1",
        }),
      ],
      [
        "number",
        equals(1),
        integerField({
          label: "Variant 2",
        }),
      ],
    ],
  };
  const form = createForm({
    ...fields,
    group: group(
      { label: "Group" },
      {
        ...fields,
        subgroup: group({ label: "Sub group" }, fields),
      },
    ),
    groups: group({ label: "Groups", multiple: true }, fields),
  });
  const fieldData = {
    string: "example",
    number: 1,
    multipleNumber: [1, 2],
    bool: true,
    multipleString: ["example1", "example2"],
  };
  const data = {
    ...fieldData,
    group: { ...fieldData, subgroup: { ...fieldData } },
    groups: [{ ...fieldData }, { ...fieldData }],
  };

  function appendObject(
    fd: FormData,
    prefix: string,
    obj: Record<string, unknown>,
  ) {
    for (const [key, value] of Object.entries(obj)) {
      const fullKey = prefix ? `${prefix}[${key}]` : key;
      if (value === undefined || value === null) continue;
      if (Array.isArray(value)) {
        if (
          value.length > 0 &&
          typeof value[0] === "object" &&
          value[0] !== null
        ) {
          value.forEach((v, i) => {
            appendObject(
              fd,
              `${fullKey}[${i}]`,
              v as Record<string, unknown>,
            );
          });
        } else {
          value.forEach((v, i) => {
            fd.append(`${fullKey}[${i}]`, String(v));
          });
        }
      } else if (typeof value === "object") {
        appendObject(fd, fullKey, value as Record<string, unknown>);
      } else {
        fd.append(fullKey, String(value));
      }
    }
  }

  function buildFormData(
    formData: Record<string, unknown>,
  ): FormData {
    const fd = new FormData();
    const definition = formDataDefinition(form, formData as Record<string, unknown>);
    fd.append("_definition", JSON.stringify(definition));
    fd.append("_renderer", "ssr");
    appendObject(fd, "", formData);
    return fd;
  }

  it("Data conversion", async () => {
    const formData = buildFormData(data);
    const result = fromFormData(form, formData);
    expect(data).toEqual(result);
  });

  it("Variants data conversion", async () => {
    const variantData = { ...data, number: 1, conditional: 2 };
    const formData = buildFormData(variantData);
    const result = fromFormData(form, formData);
    expect(variantData).toEqual(result);
  });

  it("Variant data, in array", async () => {
    const variantData = {
      ...data,
      groups: [{ number: 1, conditional: 2 }],
    };
    const formData = buildFormData(variantData);
    const result = fromFormData(form, formData);
    expect(result.groups[0].conditional).toEqual(2);
  });
});