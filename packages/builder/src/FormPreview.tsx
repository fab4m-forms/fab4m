import { SerializedForm, Theme } from "@fab4m/fab4m";

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
