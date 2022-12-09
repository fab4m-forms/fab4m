import React from "react";
import data from "../../../packages/core/docs.json";
import { Converter } from "showdown";
const converter = new Converter();
const FormComponent = data.children.find(
  (child) => child.name === "FormComponent"
);
export default function AttributesTable() {
  if (!FormComponent) {
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
        {FormComponent.children.map((child, i) => (
          <tr key={i}>
            <td>
              <strong>{child.name}</strong>
            </td>
            <td>
              <Type child={child} />
            </td>
            <td
              dangerouslySetInnerHTML={{
                __html: converter.makeHtml(
                  child.comment.summary.map((s) => s.text).join("")
                ),
              }}
            />
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Type(props: { child: Record<string, unknown> }) {
  if (props.child.type.elementType) {
    return (
      <>
        {props.child.type.elementType.name}
        {props.child.type.type === "array" && "[]"}
      </>
    );
  }
  if (props.child.type.qualifiedName) {
    return <>{props.child.type.qualifiedName}</>;
  }
  if (props.child.type.name) {
    return <>{props.child.type.name}</>;
  }
  return <>{props.child.type.type}</>;
}
