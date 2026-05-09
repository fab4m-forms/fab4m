<script lang="ts">
  import type {
    FileExtensionValidatorSettings,
    ValidatorInfoProps,
  } from "@fab4m/fab4m";

  let {
    value,
    settings,
    theme,
  }: ValidatorInfoProps<File, FileExtensionValidatorSettings> = $props();
</script>

<div class="validator-info">
  Allowed extensions: {settings.extensions.join(", ")}
</div>
