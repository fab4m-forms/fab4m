import * as React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import {
  basic,
  createForm,
  fileField,
  FormComponentWithName,
  StatefulFormView,
} from "../../src";
import { inputElementOk } from "../util";
import FormComponentView from "../../src/components/FormComponentView";

describe("upload field", () => {
  const field = fileField({
    name: "file",
    label: "A file",
    required: true,
  });

  test("File field", async () => {
    const file = new File(["str"], "value.png");
    let changedFile: File | null = null;
    const changeData = (value: unknown) => {
      changedFile = value as File;
    };
    const { getByLabelText } = render(
      <FormComponentView
        name="file"
        theme={basic}
        onChange={changeData}
        component={field}
        value={null}
      />,
    );
    fireEvent.change(getByLabelText("A file"), { files: [file] });
    waitFor(() => {
      expect(changedFile).toBe(file);
    });
  });

  test("enctype on form", async () => {
    const form = createForm();
    form.add(field as FormComponentWithName);
    const { container } = render(
      <StatefulFormView form={form}></StatefulFormView>,
    );
    expect(container.querySelector("form")?.getAttribute("enctype")).toBe(
      "multipart/form-data",
    );
  });
  inputElementOk(field, "file:");
});
