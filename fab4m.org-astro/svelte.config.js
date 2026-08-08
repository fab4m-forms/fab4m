import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const themeAbs = path.resolve(root, "src/theme.ts");
const examplesDir = path.resolve(root, "src/components/examples");

const themePreprocess = {
  name: "fab4m-docs-theme-inject",
  script({ content, filename }) {
    if (!filename || !filename.startsWith(examplesDir)) return;
    const rel = path
      .relative(path.dirname(filename), themeAbs)
      .replace(/\\/g, "/")
      .replace(/\.ts$/, "");
    return {
      code: `import "${rel}";\n${content}`,
    };
  },
};

export default {
  preprocess: [themePreprocess],
};
