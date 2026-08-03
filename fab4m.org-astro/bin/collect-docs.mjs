import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import * as fab4m from "@fab4m/fab4m";

const data = readFileSync("../packages/core/docs.json");
const docs = JSON.parse(data);

const pascal = (name) => name.charAt(0).toUpperCase() + name.slice(1);

const exampleName = (info) => pascal(info.fnName);

const examplePath = (info) =>
  `src/components/examples/${info.group}/${exampleName(info)}.tsx`;

const svelteExamplePath = (info) =>
  `src/components/examples/${info.group}/${exampleName(info)}.svelte`;

const ExampleImport = (info) => {
  if (!info.example) return "";
  const rel = `../../../../components/examples/${info.group}`;
  const name = exampleName(info);
  return `import ${name} from "${rel}/${name}.tsx";
import ${name}Source from "${rel}/${name}.tsx?raw";
${existsSync(svelteExamplePath(info)) ? `import ${name}Svelte from "${rel}/${name}.svelte";
import ${name}SvelteSource from "${rel}/${name}.svelte?raw";
` : ""}`;
};

const RenderExample = (info) => {
  if (!info.example) return "";
  const name = exampleName(info);
  const svelteImport = existsSync(svelteExamplePath(info));
  return `## Example
<CodeExample reactCode={${name}Source}${svelteImport ? ` svelteCode={${name}SvelteSource}` : ""}>
  <${name} slot="react" client:load />
${svelteImport ? `  <${name}Svelte slot="svelte" client:load />
` : ""}</CodeExample>`;
};

const componentLinks = (info, plugins) => {
  return info.pluginType?.components
    ? info.pluginType.components
        .map((name) => {
          return `* [${plugins.components.get(name).title}](/reference/components/${name})`;
        })
        .join("\n")
    : "";
};

const widgetLinks = (info, plugins) =>
  info
    ? [...plugins.widgets.values()]
        .filter((widget) =>
          widget.pluginType?.components?.includes(info.pluginType?.name),
        )
        .map(
          (widget) =>
            `* [${widget.title ?? ""}](/reference/widgets/${widget.pluginType?.name})`,
        )
        .join("\n")
    : "";

const frontmatter = (info) => `---
title: ${info.title}
---`;

const codeExampleImport = `import CodeExample from "../../../../components/CodeExample.astro";
`;

const componentTemplate = (info, plugins) => `${frontmatter(info)}
${codeExampleImport}${ExampleImport(info)}
# ${info.title}

* **Data type:** ${info.dataType}
* **JSON Schema data type:** ${info.pluginType?.dataType ?? "N/A"}

${info.text}

${RenderExample(info)}

## Available Widgets
${widgetLinks(info, plugins)}
`;

const widgetTemplate = (info, plugins) => `${frontmatter(info)}
${codeExampleImport}${ExampleImport(info)}
# ${info.title}

${info.text}

${RenderExample(info)}

## Compatible components
${componentLinks(info, plugins)}
`;

const ruleTemplate = (info, plugins) => `${frontmatter(info)}
${codeExampleImport}${ExampleImport(info)}
# ${info.title}

${info.text}

${RenderExample(info)}
`;

const groups = [
  {
    name: "components",
    title: "Components",
    template: componentTemplate,
  },
  {
    name: "widgets",
    title: "Widgets",
    template: widgetTemplate,
  },
  { name: "rules", title: "Rules", template: ruleTemplate },
  { name: "validators", title: "Validators", template: widgetTemplate },
];

function build() {
  const plugins = {};
  for (const group of groups) {
    const groupDoc = docs.groups.find(
      (groupDoc) => groupDoc.title === group.title,
    );
    if (groupDoc) {
      plugins[group.name] = new Map();
      for (const id of groupDoc.children) {
        const fn = docs.children.find(
          (child) => id === child.id && child.kind === 64,
        );
        if (fn) {
          const info = { title: fn.name, fnName: fn.name, group: group.name };
          let pluginType;
          const typeDefinition = docs.children.find(
            (child) =>
              child.name === `${fn.name}Type` ||
              (group.name === "validators" &&
                child.name === `${fn.name}Validator`),
          );
          if (typeDefinition && fab4m[typeDefinition.name]) {
            pluginType = fab4m[typeDefinition.name];
            if (pluginType.title) {
              info.title = pluginType.title;
            }
            plugins[group.name].set(pluginType.name, info);
          } else {
            plugins[group.name].set(fn.name, info);
          }
          info.pluginType = pluginType;
          info.template = group.template;
          info.dataType =
            group.name === "components"
              ? fn.signatures[0].type.typeArguments[0].name
              : null;
          info.text = fn.signatures[0].comment.summary
            .map((part) => part.text)
            .join("");
          info.example = existsSync(examplePath(info)) ? true : null;
        }
      }
    }
  }
  for (const name in plugins) {
    for (const [pluginName, plugin] of plugins[name]) {
      if (plugin.template) {
        if (!existsSync(`src/content/docs/reference/${name}`)) {
          mkdirSync(`src/content/docs/reference/${name}`, { recursive: true });
        }
        writeFileSync(
          `src/content/docs/reference/${name}/${pluginName}.mdx`,
          plugin
            .template(plugin, plugins)
            .replace(/\n{3,}/g, "\n\n")
            .replace(/\n$/, "")
            .concat("\n"),
        );
      }
    }
  }
}
build();