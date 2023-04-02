import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";

const data = readFileSync("../packages/core/docs.json");
const docs = JSON.parse(data);
import * as fab4m from "@fab4m/fab4m";

const ExampleImport = (info) =>
      info.example ? `import Example from "@site/src/components/Example";
import ExampleComponent from "${info.example}";
import ExampleComponentSource from "!!raw-loader!${info.example}";
` : '';

const RenderExample = (info) => info.example ? `## Example
<Example source={ExampleComponentSource} example={<ExampleComponent />} />` : ``;

const componentLinks = (info, plugins) => {

    return info.pluginType?.components
      ? info.pluginType.components.map(
          (name) => {
              return `* [${plugins.components.get(name).title}](/docs/components/${name})`;
          }).join("\n")
          : '';

}

const widgetLinks = (info, plugins) => info
      ? [...plugins.widgets.values()].filter(
          (widget) => widget.pluginType?.components?.includes(info.pluginType?.name)
      ).map(
          (widget) =>
              `* [${widget.title ?? ""}](/docs/widgets/${widget.pluginType?.name})`
      ).join("\n")
      : '';


const componentTemplate = (info, plugins) => `
${ExampleImport(info)}
# ${info.title}
* **Data type:** ${info.dataType}
* **JSON Schema data type:** ${info.pluginType?.dataType ?? "N/A"}

${info.text}

${RenderExample(info)}

## Available Widgets
${widgetLinks(info, plugins)}

`;

const widgetTemplate = (info, plugins) => `
${ExampleImport(info)}
# ${info.title}

${info.text}

${RenderExample(info)}

## Compatible components
${componentLinks(info, plugins)}
`;

const ruleTemplate = (info, plugins) => `
${ExampleImport(info)}
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
    { name: "validators", title: "Validators", template: widgetTemplate }
];



function build() {
    const plugins = {};
    for (const group of groups) {
        const groupDoc = docs.groups.find((groupDoc) => groupDoc.title === group.title);
        if (groupDoc) {
            plugins[group.name] = new Map();
            for (const id of groupDoc.children) {
                const fn = docs.children.find(
                    (child) => id === child.id && child.kindString === "Function"
                );
                if (fn) {
                    const info = { title: fn.name };
                    let pluginType;
                    const typeDefinition = docs.children.find(
                        (child) => child.name === `${fn.name}Type` || (group.name === "validators" && child.name === `${fn.name}Validator`)
                    );
                    if (typeDefinition && fab4m[typeDefinition.name]) {
                        pluginType = fab4m[typeDefinition.name];
                        if (pluginType.title) {
                            info.title = pluginType.title;
                        }
                        plugins[group.name].set(pluginType.name, info);
                    }
                    else {
                        console.log("fail", fn.name);
                        plugins[group.name].set(fn.name, info);
                    }
                    info.pluginType = pluginType;
                    info.template = group.template;
                    const examplePath = `src/components/examples/${group.name}/${fn.name}Example.tsx`;
                    info.example = existsSync(examplePath) ? `@site/${examplePath}` : null;
                    if (group.name === "components") {
                        info.dataType = fn.signatures[0].type.typeArguments[0].name;
                    }
                    info.text = fn.signatures[0].comment.summary.map((part) => part.text).join("");
                }
            }
        }
    }
  for (const name in plugins) {
      for (const [pluginName, plugin] of plugins[name]) {
        if (plugin.template) {
          if (!existsSync(`docs/${name}`)) {
            mkdirSync(`docs/${name}`);
          }
          writeFileSync(`docs/${name}/${pluginName}.mdx`, plugin.template(plugin, plugins));
      }
    }
  }
}
build();
