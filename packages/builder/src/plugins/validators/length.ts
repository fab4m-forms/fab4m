import {
  floatField,
  maxLengthValidator,
  minLengthValidator,
} from "@fab4m/fab4m";
import { ValidatorTypePlugin } from "../..";

export const minLengthValidatorPlugin: ValidatorTypePlugin<number, number> = {
  type: minLengthValidator,
  component: () =>
    floatField({
      required: true,
    }),
  settingsSchema: () => ({
    type: "boolean",
  }),
};

export const maxLengthValidatorPlugin: ValidatorTypePlugin<number, number> = {
  type: maxLengthValidator,
  component: () =>
    floatField({
      required: true,
    }),
  settingsSchema: () => ({
    type: "boolean",
  }),
};
