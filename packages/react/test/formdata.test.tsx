import * as React from "react";
import { getFormElement } from "./util";
import { render } from "@testing-library/react";

import {
  booleanField,
  createForm,
  integerField,
  textField,
  group,
  FormView,
  fromFormData,
  equals,
  Components,
} from "../src";

describe("Form data unpacking", () => {
  const fields: Components<Record<string, any>> = {
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

  const getFormData = (renderData: Record<string, unknown>) => {
    const { container } = render(<FormView form={form} data={renderData} />);
    const element = getFormElement(container);
    return new FormData(element);
  };
  test("Data conversion", async () => {
    const formData = getFormData(data);
    const result = fromFormData(form, formData);
    expect(data).toEqual(result);
  });
  test("Variants data conversion", async () => {
    const variantData = { ...data, number: 1, conditional: 2 };
    const formData = getFormData(variantData);
    const result = fromFormData(form, formData);
    expect(variantData).toEqual(result);
  });
  test("Variant data, in array", async () => {
    const variantData = {
      ...data,
      groups: [{ number: 1, conditional: 2 }],
    };
    const formData = getFormData(variantData);
    const result = fromFormData(form, formData);
    expect(result.groups[0].conditional).toEqual(2);
  });
});
