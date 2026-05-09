<script lang="ts">
  import type { WidgetProps } from "@fab4m/fab4m";
  import FormComponentWrapper from "../components/FormComponentWrapper.svelte";

  type Props = WidgetProps<File, unknown | undefined>;

  let { component, theme, value, onChange, name, id, attributes, hideLabel, labels }: Props = $props();

  let classes = $derived(theme.classes);

  let changeFile = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const file = target.files[0];
      onChange(file);
    }
  };
</script>

<FormComponentWrapper
  {component}
  {theme}
  {hideLabel}
  {labels}
  {name}
  {id}
  {attributes}
>
  <input
    type="file"
    class={classes.fileInput}
    disabled={component.disabled}
    required={component.required}
    onchange={changeFile}
    {name}
    {id}
    {...attributes}
  />
</FormComponentWrapper>
