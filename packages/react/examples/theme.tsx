import * as React from "react";
import { basic, FormViewProps, tailwind, Theme } from "@fab4m/fab4m";
import { FormView, StatefulFormView } from "../src/index";

/**
 * The themes the testbed can switch between.
 */
export type ThemeName = "basic" | "tailwind";

export const themes: Record<ThemeName, Theme> = {
  basic,
  tailwind,
};

const ThemeContext = React.createContext<{
  themeName: ThemeName;
  theme: Theme;
  setThemeName: (name: ThemeName) => void;
}>({
  themeName: "basic",
  theme: basic,
  setThemeName: () => {},
});

/**
 * Provides the currently selected testbed theme to all example pages.
 */
export function ThemeProvider(props: { children: React.ReactNode }) {
  const [themeName, setThemeName] = React.useState<ThemeName>("basic");
  const theme = themes[themeName];
  const value = React.useMemo(
    () => ({ themeName, theme, setThemeName }),
    [themeName, theme],
  );
  return (
    <ThemeContext.Provider value={value}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return React.useContext(ThemeContext);
}

/**
 * The theme is stored on the form instance, so we apply the currently
 * selected testbed theme to the form before rendering it.
 */
function useApplyTheme(form: { theme: Theme }): void {
  const { theme } = useTheme();
  form.theme = theme;
}

/**
 * Render a FormView with the currently selected testbed theme applied to
 * the form.
 */
export function ThemedFormView(props: FormViewProps) {
  useApplyTheme(props.form);
  return <FormView {...props} />;
}

/**
 * Render a StatefulFormView with the currently selected testbed theme
 * applied to the form.
 */
export function ThemedStatefulFormView(
  props: React.ComponentProps<typeof StatefulFormView>,
) {
  useApplyTheme(props.form);
  return <StatefulFormView {...props} />;
}
