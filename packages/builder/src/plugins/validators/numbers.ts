import { integerField, minValidator, maxValidator } from "@fab4m/fab4m";
import { ValidatorTypePlugin } from "../..";

export const minValidatorPlugin: ValidatorTypePlugin<number, number> = {
  type: minValidator,
  component: () =>
    integerField({
      required: true,
    }),
  settingsSchema: () => ({
    type: "integer",
  }),
};

export const maxValidatorPlugin: ValidatorTypePlugin<number, number> = {
  type: maxValidator,
  component: () =>
    integerField({
      required: true,
    }),
  settingsSchema: () => ({
    type: "integer",
  }),
};
