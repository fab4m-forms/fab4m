import React, { ReactNode } from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";
import CodeBlock from "@theme/CodeBlock";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

export default function Example(props: { source: string; example: ReactNode }) {
  return (
    <Tabs>
      <TabItem value="code" label="Code">
        <CodeBlock language="jsx">{props.source}</CodeBlock>
      </TabItem>

      <TabItem value="example" label="Example">
        <BrowserOnly>{() => props.example}</BrowserOnly>
      </TabItem>
    </Tabs>
  );
}
