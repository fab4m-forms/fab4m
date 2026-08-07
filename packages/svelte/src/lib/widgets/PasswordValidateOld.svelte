<script lang="ts">
  import type {
    PasswordValidateOldData,
    PasswordValidateOldSettings,
    WidgetProps,
  } from "@fab4m/fab4m";
  import FormElement from "../components/FormElement.svelte";

  type Props = WidgetProps<PasswordValidateOldData, PasswordValidateOldSettings>;

  let {
    component,
    theme,
    settings,
    value,
    onChange,
    name,
    id,
    attributes,
    labels,
  }: Props = $props();

  const classes = $derived(theme.classes);
  const confirmName = $derived(`${id}_confirm`);
  const confirmTitle = $derived(settings?.confirmTitle ?? "Confirm password");
  const oldPasswordLabel = $derived(settings?.oldPasswordLabel ?? "Old password");

  const oldPasswordValue = $derived(value?.oldPassword ?? "");
  const passwordValue = $derived(value?.password ?? "");
  const confirmPasswordValue = $derived(value?.confirmPassword ?? "");
  const matches = $derived(
    !!value &&
      value.password.length > 0 &&
      value.confirmPassword === value.password,
  );

  function changeOldPassword(e: Event) {
    const target = e.currentTarget as HTMLInputElement;
    onChange({
      oldPassword: target.value,
      password: value?.password ?? "",
      confirmPassword: value?.confirmPassword ?? "",
    });
  }

  function changePassword(e: Event) {
    const target = e.currentTarget as HTMLInputElement;
    onChange({
      oldPassword: value?.oldPassword ?? "",
      password: target.value,
      confirmPassword: value?.confirmPassword ?? "",
    });
  }

  function changeConfirmPassword(e: Event) {
    const target = e.currentTarget as HTMLInputElement;
    onChange({
      oldPassword: value?.oldPassword ?? "",
      password: value?.password ?? "",
      confirmPassword: target.value,
    });
  }
</script>

<div class={classes.componentWrapper}>
  <FormElement
    labelClass={classes.label}
    childrenClass={classes.elementWrapper}
    required={component.required}
    requiredText={labels?.required ?? "Required"}
    requiredClass={classes.requiredIndicator}
    labelWrapperClass={classes.labelWrapper}
    id={name}
    label={oldPasswordLabel}
  >
    <input
      type="password"
      class={classes.input}
      required={component.required || oldPasswordValue !== ""}
      value={oldPasswordValue}
      oninput={changeOldPassword}
      name={`${name}[oldpassword]`}
      id={`${id}_oldpassword`}
      {...attributes}
    />
  </FormElement>
</div>

<div class={classes.componentWrapper}>
  <FormElement
    labelClass={classes.label}
    childrenClass={classes.elementWrapper}
    required={component.required}
    requiredText={labels?.required ?? "Required"}
    requiredClass={classes.requiredIndicator}
    labelWrapperClass={classes.labelWrapper}
    id={id}
    label={component.label}
  >
    <input
      type="password"
      class={classes.input}
      required={component.required}
      value={passwordValue}
      oninput={changePassword}
      name={`${name}[password]`}
      {id}
      {...attributes}
    />
  </FormElement>
</div>

<div class={classes.componentWrapper}>
  <FormElement
    labelClass={classes.label}
    childrenClass={classes.elementWrapper}
    required={component.required}
    requiredText={labels?.required ?? "Required"}
    requiredClass={classes.requiredIndicator}
    labelWrapperClass={classes.labelWrapper}
    id={confirmName}
    label={confirmTitle}
  >
    <input
      type="password"
      class={classes.input}
      required={component.required}
      value={confirmPasswordValue}
      oninput={changeConfirmPassword}
      name={`${name}[confirmPassword]`}
      id={`${id}_confirm`}
      pattern={value ? `^${value.password}$` : undefined}
    />
    {#if matches}
      <div class={classes.descriptionOk}>The password matches!</div>
    {/if}
  </FormElement>
</div>