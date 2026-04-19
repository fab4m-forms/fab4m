import { createTailwindTheme, setDefaultTheme } from "@fab4m/fab4m";

const theme = createTailwindTheme({
  settings: {
    primaryBg: "bg-cyan-600",
    secondaryBg: "bg-cyan-600",
  },
});
setDefaultTheme(theme);

export default function CodeExampleWrapper(props: React.PropsWithChildren) {
  return props.children;
}
