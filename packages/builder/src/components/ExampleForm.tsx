import React from "react";
import { unserializeForm } from "../util";
import { useFormBuilder } from "../context";
import { StatefulFormView, Theme } from "@fab4m/fab4m";

export type ExampleFormProps = {
  theme: Theme;
};

export function ExampleForm(props: ExampleFormProps) {
  const { plugins, form } = useFormBuilder();
  const unserializedForm = unserializeForm(
    { ...form, theme: props.theme.name },
    plugins,
    [props.theme],
  );
  return <StatefulFormView form={unserializedForm} hideSubmit={true} />;
}
