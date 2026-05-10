<script lang="ts">
  import type { Snippet } from "svelte";
  /**
   * @internal
   */
  let {
    id,
    label,
    required,
    requiredText,
    labelWrapperClass = "title-wrapper",
    childrenClass = "control",
    labelClass = "form-label",
    requiredClass = "required-indicator",
    children,
  }: {
    id: string;
    label?: string;
    required: boolean;
    requiredText: string;
    labelWrapperClass?: string;
    childrenClass?: string;
    labelClass?: string;
    requiredClass?: string;
    children: Snippet;
  } = $props();
</script>

<div class={labelWrapperClass}>
  {#if label}
    <label class={labelClass} for={id}>
      <span>{label}</span>
    </label>
  {/if}
  {#if label && required}
    <span class={requiredClass} aria-label={requiredText}>*</span>
  {/if}
</div>
<div class={childrenClass}>
  {@render children()}
</div>
