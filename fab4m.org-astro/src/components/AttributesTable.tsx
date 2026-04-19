import React from "react";
import data from "../../../packages/core/docs.json";

type DocNode = {
  name?: string;
  children?: DocNode[];
  comment?: { summary?: { text?: string }[] };
  type?: {
    elementType?: { name?: string };
    qualifiedName?: string;
    name?: string;
    type?: string;
  };
};

const formComponent = (data as DocNode).children?.find(
  (child) => child.name === "FormComponent",
);

function Type({ child }: { child: DocNode }) {
  if (child.type?.elementType?.name) {
    return (
      <>
        {child.type.elementType.name}
        {child.type.type === "array" && "[]"}
      </>
    );
  }
  if (child.type?.qualifiedName) {
    return <>{child.type.qualifiedName}</>;
  }
  if (child.type?.name) {
    return <>{child.type.name}</>;
  }
  return <>{child.type?.type ?? "unknown"}</>;
}

export default function AttributesTable() {
  if (!formComponent?.children) {
    return null;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {formComponent.children.map((child, i) => (
          <tr key={i}>
            <td>
              <strong>{child.name}</strong>
            </td>
            <td>
              <Type child={child} />
            </td>
            <td>{child.comment?.summary?.map((s) => s.text).join("") ?? ""}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
