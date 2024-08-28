import React from "react";
import { unserializeForm } from "../util";
import { useFormBuilder } from "../context";
import { StatefulFormView, Theme } from "@fab4m/fab4m";

export type FormPreviewProps = {
  theme: Theme;
};

export function FormPreview(props: FormPreviewProps) {
  const { plugins, form } = useFormBuilder();
  const unserializedForm = unserializeForm(
    { ...form, theme: props.theme.name },
    plugins,
    [props.theme],
  );
  return <StatefulFormView form={unserializedForm} hideSubmit={true} />;
}
