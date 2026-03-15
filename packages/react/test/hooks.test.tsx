import * as React from "react";
import { waitFor } from "@testing-library/react";
import { FormView } from "../src/index";
import { useForm } from "../src/index";
import { textField, textFieldWidget, createForm } from "@fab4m/fab4m";
import { renderWithProvider } from "./util";


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
    const { findByLabelText } = renderWithProvider(
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
