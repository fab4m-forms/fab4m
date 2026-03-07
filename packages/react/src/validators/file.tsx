import {
  FileExtensionValidatorSettings,
  FileSizeSettings,
  ValidatorInfoProps,
} from "../../../core/src";

export function FileSizeInfo(
  props: ValidatorInfoProps<File, FileSizeSettings>,
) {
  return (
    <div className={"validator-info"}>
      {props.settings.maxSizeInfo.replace(
        "%size",
        humanSize(props.settings.size),
      )}
    </div>
  );
}

export function FileExtensionInfo(
  props: ValidatorInfoProps<File, FileExtensionValidatorSettings>,
) {
  return (
    <div className={"validator-info"}>
      Allowed extensions: {props.settings.extensions.join(", ")}
    </div>
  );
}

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
