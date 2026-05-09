<script lang="ts">
  import type { WidgetProps } from "@fab4m/fab4m";

  type Props = WidgetProps<string | number, undefined>;

  let { component, value, name, id, attributes }: Props = $props();
</script>

<input
  type="hidden"
  required={component.required}
  disabled={component.disabled}
  data-testid={`hidden-${id}`}
  value={value ?? ""}
  {name}
  {id}
  {...attributes}
/>
