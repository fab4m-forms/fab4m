import React from "react";
import {
  createForm,
  pageBreak,
  fileField,
  StatefulFormView,
  content,
  fileExtension,
} from "@fab4m/fab4m";
import "@fab4m/fab4m/css/basic/basic.css";

const form = createForm({
  image: fileField({
    label: "Image",
    validators: [
      fileExtension(["jpg", "png"], {
        message: "The file type is not allowed!",
      }),
    ],
  }),
  break: pageBreak(),
  content: content({}, (data) => <div>Nice upload {data.image.name}!</div>),
});

export default function FileExtensionExample() {
  return <StatefulFormView form={form} hideSubmit={true} />;
}
