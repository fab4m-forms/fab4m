import CodeBlock from "@theme/CodeBlock";
import * as React from "react";

export default function Rewrite({ source }: { source: string }) {
  const rewrittenSource = source.replace("../../src", "@fab4m/routerforms");
  return <CodeBlock language="jsx">{rewrittenSource}</CodeBlock>;
}
