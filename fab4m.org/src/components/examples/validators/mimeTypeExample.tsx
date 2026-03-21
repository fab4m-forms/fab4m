import React from "react";
import { createForm, pageBreak, fileField, mimeType } from "@fab4m/fab4m";
import "@fab4m/fab4m/css/basic/basic.css";
import {
  StatefulFormView,
  content,
  FormProvider,
  allWidgetsRenderer,
} from "@fab4m/react";

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
  return (
    <FormProvider renderer={allWidgetsRenderer}>
      <StatefulFormView form={form} hideSubmit={true} />
    </FormProvider>
  );
}
