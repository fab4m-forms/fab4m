<script lang="ts">
  import type { SubmitWidgetSettings, WidgetProps } from "@fab4m/fab4m";

  type Props = WidgetProps<unknown, SubmitWidgetSettings>;

  let { theme, settings, name }: Props = $props();
  let classes = $derived(theme.classes);
</script>

<input
  class={classes.submitButton}
  type="submit"
  value={settings.title}
  {name}
/>
