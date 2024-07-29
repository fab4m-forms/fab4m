import { SerializedForm, StatefulFormView, Theme } from "@fab4m/fab4m";
import { Plugins } from "./index";
import { unserializeForm } from "./util";
import React from "react";

type FormPreviewProps = {
  plugins: Plugins;
  form: SerializedForm;
  themes: Theme[];
};
export default function FormPreview(props: FormPreviewProps) {
  <StatefulFormView
    hideSubmit={true}
    form={unserializeForm(props.form, props.plugins, props.themes)}
  />;
}
