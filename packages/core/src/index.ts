import { Theme } from "./theme";
import { basic, basicDark } from "./themes/basic";
export * from "./form";
export * from "./types/text";
export * from "./types/boolean";
export * from "./serializer";
export * from "./types/email";
export * from "./types/group";
export * from "./types/pagebreak";
export * from "./types/file";
export * from "./types/submit";
export * from "./schema";
export * from "./component";
export * from "./formview";
export * from "./widget";
export * from "./theme";
export * from "./validator";
export * from "./validators/equals";
export * from "./validators/length";
export * from "./validators/password";
export * from "./validators/values";
export * from "./validators/numbers";
export * from "./validators/exists";
export * from "./validators/callback";
export * from "./rules/or";
export * from "./rules/and";
export * from "./rules/not";
export * from "./rule";
export * from "./widgets/options";
export * from "./types/number";
export * from "./types/url";
export * from "./types/date";
export * from "./types/password";
export * from "./widgets/multiple";
export * from "./formdata";
export * from "./widgets/hidden";
export * from "./formFromSchema";
let defaultTheme: Theme = basic;
export { defaultTheme, basic, basicDark };

export function setDefaultTheme(theme: Theme) {
  defaultTheme = theme;
}

export { default as bulma } from "./themes/bulma";
export { default as tailwind, createTailwindTheme } from "./themes/tailwind";
export type { TailwindSettings } from "./themes/tailwind";
