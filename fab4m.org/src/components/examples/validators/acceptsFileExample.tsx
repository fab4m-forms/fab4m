import React from "react";
import {
  createForm,
  fileField,
  StatefulFormView,
  content,
  acceptsFile,
} from "@fab4m/fab4m";
import "@fab4m/fab4m/css/basic/basic.css";

const form = createForm({
  image: fileField({
    label: "Image",
    validators: [acceptsFile([".jpg", ".png"])],
  }),
  content: content({}, (data) => (
    <div>{data.image ? `Nice upload: ${data.image.name}!` : null}</div>
  )),
});

export default function FileExtensionExample() {
  return <StatefulFormView form={form} hideSubmit={true} />;
}
