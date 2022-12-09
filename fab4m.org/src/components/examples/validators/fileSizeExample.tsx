import React from "react";
import {
  createForm,
  pageBreak,
  fileField,
  StatefulFormView,
  content,
  fileSize,
} from "fab4m";
import "fab4m/css/basic/basic.css";

const form = createForm({
  file: fileField({
    label: "File",
    validators: [
      fileSize(1024, {
        message:
          "The file is too large, maximum size is %size. The uploaded file is %fileSize.",
        maxSizeInfo: "Max file size: %size",
      }),
    ],
  }),
  break: pageBreak(),
  content: content({}, (data) => <div>Nice upload {data.file.name}!</div>),
});

export default function FileExtensionExample() {
  return <StatefulFormView form={form} hideSubmit={true} />;
}
