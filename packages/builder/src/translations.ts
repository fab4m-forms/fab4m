export let translations = {
  components: "Components",
  delete: "Delete",
  "options.options": "Options",
  "options.notSelectedLabel": "Not selected label",
  "autocomplete.options": "Options",
  "disallowedValues.items": "Values",
  "disallowedValues.message": "Error message",
  "allowedValues.items": "Values",
  "allowedValues.message": "Error message",
  "length.maxValue": "Max value",
  "numbers.minValue": "Min value",
  "length.minLength": "Min length",
  "length.maxLength": "Max length",
  locale: "Locale",
  open: "Open",
  useBrowserLocale: "Use browser locale",
  availableLocales: "Available locales",
  format: "Format",
  fromLabel: "From",
  toLabel: "To",
  withTime: "Include time",
  optionalEndDate: "Make end date optional",
  required: "required",
  complete: "Complete",
  previous: "Previous",
  next: "Next",
  submit: "Submit",
  formSettingsSaved: "Form settings saved!",
  settingsSaved: "Settings saved",
  cancel: "Cancel",
  addNewComponent: "Add new component",
  newComponent: "New component",
  pageBreak: "Page break",
  formSettings: "Form settings",
  editForm: "Edit form",
  componentXSaved: "%component saved",
  componentSaved: "Component saved",
  confirmRemoveComponent:
    "Are you sure you want to remove the component %component?",
  "formsettings.required": "Required",
  "formsettings.complete": "Complete",
  "formsettings.previous": "Previous",
  "formsettings.next": "Next",
  "formsettings.submit": "Submit",
  "formsettings.labels": "Labels",
  "formsettings.theme": "Theme",
  rule: "Rule",
  component: "Component",
  rules: "Rules",
  validator: "Validator",
  validators: "Validators",
  maxItems: "Max items",
  minItems: "Min items",
  multiple: "Multiple",
  description: "Description",
  machineName: "Machine name",
  label: "Label",
  widgetSettings: "Widget settings",
  componentSettings: "Component settings",
  toastClose: "Close",
  na: "N/A",
  addValidator: "Add validator",
  addRule: "Add rule",
  validatorType: "Validator",
  value: "Value",
  "allowedValues.description": "Enter each value separated by comma (,)",
};

export default function t(
  translation: keyof typeof translations,
  replacements: Record<string, string> = {},
) {
  let translated = translations[translation] ?? translation;
  for (const key in replacements) {
    translated = translated.replace(`%${key}`, replacements[key]);
  }
  return translated;
}

export function setTranslations(newTranslations: typeof translations) {
  translations = newTranslations;
}
