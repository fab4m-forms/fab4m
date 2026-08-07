import { createTailwindTheme, setDefaultTheme } from "@fab4m/fab4m";

// Runs at module-evaluation time, before the example component modules create
// their forms, so the (server-)rendered examples use the tailwind theme.
setDefaultTheme(
  createTailwindTheme({
    settings: {
      primaryBg: "bg-cyan-600",
      secondaryBg: "bg-cyan-600",
    },
  }),
);
