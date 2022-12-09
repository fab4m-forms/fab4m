const { readFileSync, writeFileSync } = require("node:fs");
const [, , file, destination] = process.argv;
const regex = /import\s([\w]+)\sfrom\s\"!!raw-loader!@site(.*)"/g;
let content = readFileSync(file).toString();
let result;
while ((result = regex.exec(content)) !== null) {
  if (result[2].includes("routerforms")) {
    const rewriteRegex = `<Rewrite\\ssource={${result[1]}}.*`;
    const rewriteContent = readFileSync(`fab4m.org/${result[2]}.tsx`)
      .toString()
      .replace("../../src", "@fab4m/routerforms");
    const rewriteMarkdown = "```jsx\n" + rewriteContent + "\n```";
    content = content.replace(new RegExp(rewriteRegex), rewriteMarkdown);
  } else {
    const exampleRegex = `<Example\\ssource={${result[1]}}.*`;
    const exampleMarkdown =
      "```jsx\n" +
      readFileSync(`fab4m.org/${result[2]}.tsx`).toString() +
      "\n```";
    content = content.replace(new RegExp(exampleRegex), exampleMarkdown);
  }
}
writeFileSync(destination, content);
