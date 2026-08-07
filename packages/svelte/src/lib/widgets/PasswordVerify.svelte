<script lang="ts">
  import type {
    PasswordSettings,
    PasswordVerifyData,
    WidgetProps,
  } from "@fab4m/fab4m";
  import FormComponentWrapper from "../components/FormComponentWrapper.svelte";

  type Props = WidgetProps<PasswordVerifyData, PasswordSettings>;

  let {
    component,
    theme,
    settings,
    value,
    onChange,
    name,
    id,
    attributes,
    hideLabel,
    labels,
  }: Props = $props();

  const classes = $derived(theme.classes);
  const confirmName = $derived(`${id}_confirm`);
  const confirmTitle = $derived(settings?.confirmTitle ?? "Confirm password");
  const passwordValue = $derived(value?.password ?? "");
  const confirmPasswordValue = $derived(value?.confirmPassword ?? "");
  const matches = $derived(
    !!value &&
      value.password.length > 0 &&
      value.confirmPassword === value.password,
  );

  function changePassword(e: Event) {
    const target = e.currentTarget as HTMLInputElement;
    onChange({
      password: target.value,
      confirmPassword: value?.confirmPassword ?? "",
    });
  }

  function changeConfirmPassword(e: Event) {
    const target = e.currentTarget as HTMLInputElement;
    onChange({
      password: value?.password ?? "",
      confirmPassword: target.value,
    });
  }
</script>

<div class={classes.componentWrapper}>
  <FormComponentWrapper
    {component}
    {theme}
    {hideLabel}
    {labels}
    {name}
    {id}
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
  </FormComponentWrapper>
</div>

<div class={classes.componentWrapper}>
  <FormComponentWrapper
    {component}
    {theme}
    {hideLabel}
    {labels}
    {name}
    id={confirmName}
    label={confirmTitle}
  >
    <input
      type="password"
      class={classes.input}
      required={component.required || passwordValue !== ""}
      value={confirmPasswordValue}
      oninput={changeConfirmPassword}
      name={`${name}[confirmPassword]`}
      id={`${id}-confirmPassword`}
      pattern={value ? `^${value.password}$` : undefined}
    />
    {#if matches}
      <div class={classes.descriptionOk}>The password matches!</div>
    {/if}
  </FormComponentWrapper>
</div>