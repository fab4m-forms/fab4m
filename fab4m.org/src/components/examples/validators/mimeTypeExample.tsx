import React from "react";
import {
  createForm,
  pageBreak,
  fileField,
  StatefulFormView,
  content,
  mimeType,
} from "@fab4m/fab4m";
import "@fab4m/fab4m/css/basic/basic.css";

const form = createForm({
  image: fileField({
    label: "Image",
    validators: [
      mimeType(["image/jpg", "image/png"], {
        message: "The mimetype is not allowed!",
      }),
    ],
  }),
  break: pageBreak(),
  content: content({}, (data) => <div>Nice upload {data.image.name}!</div>),
});

export default function MimeTypeExample() {
  return <StatefulFormView form={form} hideSubmit={true} />;
}
