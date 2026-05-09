<script lang="ts">
  import type {
    FileExtensionValidatorSettings,
    FileSizeSettings,
    ValidatorInfoProps,
  } from "@fab4m/fab4m";

  function humanSize(size: number) {
    const units: Array<[number, string]> = [
      [1024, "KB"],
      [Math.pow(1024, 2), "MB"],
      [Math.pow(1024, 3), "GB"],
    ];
    let unitName = "B";
    let divide = 1;
    for (let i = 0; i < units.length; i++) {
      if (Math.pow(1024, i + 1) <= size) {
        divide = units[i][0];
        unitName = units[i][1];
      }
    }
    return `${Math.round(size / divide)}${unitName}`;
  }

  let { value, settings, theme }: ValidatorInfoProps<File, FileSizeSettings> =
    $props();
</script>

<div class="validator-info">
  {settings.maxSizeInfo.replace("%size", humanSize(settings.size))}
</div>
