import { Theme, defaultThemeClasses, ThemeClasses } from "../../theme";
const fab4mPrefixed: ThemeClasses = {
  ...defaultThemeClasses,
  dateRangeWrapper: "date-range-wrapper",
  dateRangeSeparator: "date-range-separator",
};
for (const name in fab4mPrefixed) {
  fab4mPrefixed[name] = `fab4m-${fab4mPrefixed[name]}`;
}

/**
 * The basic theme provides a clean non-intrusive form style.
 * You need to load the provided stylesheet for the basic theme to work:
 * fab4m/css/basic/basic.css
 * @group Themes
 */
const basic: Theme = {
  name: "basic",
  module: "fabform-core",
  stylesheet: "css/basic/basic.css",
  classes: fab4mPrefixed,
};

const basicDark: Theme = {
  name: "basicDark",
  module: "fabform-core",
  stylesheet: "css/basic/basic.css",
  classes: { ...fab4mPrefixed, formWrapper: "fab4m-dark-form-wrapper" },
};
export { basic, basicDark };
