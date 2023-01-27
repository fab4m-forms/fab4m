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
} from "../src";
describe("Form data unpacking", () => {
  const fields = {
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
  };
  const form = createForm({
    ...fields,
    group: group(
      { label: "Group" },
      {
        ...fields,
        subgroup: group({ label: "Sub group" }, fields),
      }
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
  const { container } = render(<FormView id="form" form={form} data={data} />);
  const getFormData = () => {
    const element = getFormElement(container);
    return new FormData(element);
  };
  test("Data conversion", async () => {
    const formData = getFormData();
    const result = fromFormData(form, formData);
    expect(data).toEqual(result);
  });
});
