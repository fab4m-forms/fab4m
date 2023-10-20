import * as React from "react";
import { render, waitFor } from "@testing-library/react";
import {
  textField,
  textFieldWidget,
  useForm,
  createForm,
  FormView,
} from "../src";

describe("Hooks", () => {
  interface FormData {
    requiredText: string;
    otherText?: string;
  }

  const components = {
    requiredText: textField({
      label: "Required text",
      required: true,
      widget: textFieldWidget(),
      validators: [],
    }),
    otherText: textField({
      label: "Other text field",
      widget: textFieldWidget(),
      required: false,
      validators: [],
    }),
  };
  function FormComponent(props: { data: FormData }) {
    const form = useForm<FormData>(() => createForm<FormData>(components));
    return <FormView form={form} data={props.data} />;
  }
  test("Form using hook", async () => {
    const { findByLabelText } = render(
      <FormComponent
        data={{ requiredText: "Required text", otherText: "Other text" }}
      />,
    );
    const requiredText = (await findByLabelText(
      "Required text",
    )) as HTMLInputElement;
    const otherText = (await findByLabelText(
      "Other text field",
    )) as HTMLInputElement;
    await waitFor(() => {
      expect(requiredText.value).toBe("Required text");
      expect(otherText.value).toBe("Other text");
    });
  });
});
