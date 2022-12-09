import { emailField, FormComponent, textField } from "@fab4m/fab4m";

export interface ComponentInfo {
  code: string;
  component: FormComponent;
}

export const definitions = new Map<string, ComponentInfo>([
  [
    "text",
    {
      component: textField({
        label: "Occupation",
        required: true,
      }),
      code: `\n  occupation: textField({
    title: "Occupation",
    required: true,
  })`,
    },
  ],
  [
    "email",
    {
      component: emailField({
        label: "Your email",
        required: true,
      }),
      code: `\n  email: emailField({
    title: "Your email",
    required: true,
  })`,
    },
  ],
]);
