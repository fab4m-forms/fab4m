import { Validator, ValidatorType } from "../../validator";
import React from "react";

/**
 * @internal
 */
interface FileSizeSettings {
  size: number;
  message: string;
  maxSizeInfo: string;
}

/**
 * @internal
 */
export type FileSizeValidatorType = ValidatorType<
  File,
  FileSizeSettings,
  unknown
>;

/**
 * translate the size into a human readable value.
 * @internal
 */
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

/**
 * A validator that checks if the size of the file is smallar than or equal to
 * the provided value.
 * @group Validators
 */
export const fileSizeValidator: FileSizeValidatorType = {
  name: "filesize",
  title: "Max file Size",
  schema: () => ({}),
  defaultSettings: {
    size: 1024 * 1024,
    message: "The uploaded file is too large.",
    maxSizeInfo: "Max file size: %size",
  },
  components: ["file"],
  validatorInfo: (props) => (
    <div className={"validator-info"}>
      {props.settings.maxSizeInfo.replace(
        "%size",
        humanSize(props.settings.size),
      )}
    </div>
  ),
  validate: async (value, settings) => {
    return value?.size > settings.size
      ? [
          {
            path: "",
            message: settings.message
              .replace("%size", humanSize(settings.size))
              .replace("%fileSize", humanSize(value.size)),
          },
        ]
      : [];
  },
  valid: (value, settings) => value?.size > settings.size,
};

/**
 * Validate that a provided file isn't larger than the provided file size.
 * @group Validators
 */
export function fileSize(
  size: number,
  settings?: Partial<FileSizeSettings>,
): Validator<FileSizeValidatorType, FileSizeSettings> {
  return {
    type: fileSizeValidator,
    settings: { ...fileSizeValidator.defaultSettings, size, ...settings },
  };
}

interface FileExtensionValidatorSettings {
  extensions: string[];
  message: string;
}

/**
 * @internal
 */
export type FileExtensionValidatorType = ValidatorType<
  File,
  FileExtensionValidatorSettings,
  unknown
>;

/**
 * File extension validator allows you to validate that the file
 * extension matches one of the provided allowed extensions.
 * @group Validators
 */
export const fileExtensionValidator: FileExtensionValidatorType = {
  name: "fileExtension",
  title: "Allowed file extensions",
  components: ["file"],
  schema: () => ({}),
  validatorInfo: (props) => (
    <div className={"validator-info"}>
      Allowed extensions: {props.settings.extensions.join(", ")}
    </div>
  ),
  defaultSettings: {
    extensions: [],
    message: "The file type is not allowed.",
  },
  validate: async (value, settings) => {
    return value &&
      !settings.extensions.includes(
        value.name
          .toLowerCase()
          .slice(value.name.lastIndexOf(".") + 1, value.name.length),
      )
      ? [
          {
            path: "",
            message: settings.message,
          },
        ]
      : [];
  },
  valid: (value, settings) =>
    !value ||
    settings.extensions.includes(
      value.name
        .toLowerCase()
        .slice(value.name.lastIndexOf(".") + 1, value.name.length),
    ),
};

/**
 * The file extension validator allows you to validate that the file
 * extension matches one of the provided allowed extensions.
 * @group Validators
 */
export function fileExtension(
  types: string[],
  settings?: Partial<FileExtensionValidatorSettings>,
): Validator<FileExtensionValidatorType, FileExtensionValidatorSettings> {
  return {
    type: fileExtensionValidator,
    settings: {
      ...fileExtensionValidator.defaultSettings,
      extensions: types,
      ...settings,
    },
  };
}

interface MimeTypeValidatorSettings {
  types: string[];
  message: string;
}

/**
 * @internal
 */
export type MimeTypeValidatorType = ValidatorType<
  File,
  MimeTypeValidatorSettings,
  unknown
>;

/**
 * The mime type validator type allows you to validate that the file
 * mime type matches one of the provided mime types.
 * @group Validators
 */
export const mimeTypeValidator: MimeTypeValidatorType = {
  name: "mimetype",
  title: "Allowed mime types",
  schema: () => ({}),
  components: ["file"],
  defaultSettings: { types: [], message: "file type is not allowed." },
  validate: async (value, settings) => {
    return value?.type && !settings.types.includes(value.type)
      ? [
          {
            path: "",
            message: settings.message,
          },
        ]
      : [];
  },
  valid: (value, settings) => settings.types.includes(value.type),
};

/**
 * Allows you to validate that the file
 * mime type matches one of the provided mime types.
 * @group Validators
 */
export function mimeType(
  types: string[],
  settings?: Partial<MimeTypeValidatorSettings>,
): Validator<MimeTypeValidatorType, MimeTypeValidatorSettings> {
  return {
    type: mimeTypeValidator,
    settings: { ...mimeTypeValidator.defaultSettings, types, ...settings },
  };
}
