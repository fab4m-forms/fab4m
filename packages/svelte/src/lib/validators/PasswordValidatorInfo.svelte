<script lang="ts">
  import type {
    PasswordVerifyData,
    ValidationSettings,
    ValidatorInfoProps,
  } from "@fab4m/fab4m";

  type Props = ValidatorInfoProps<
    PasswordVerifyData | string,
    ValidationSettings
  >;

  let { value, settings, theme }: Props = $props();

  const classes = $derived(theme.classes);
  const password = $derived(
    typeof value === "string" ? value : value?.password ?? "",
  );
  const lengthValid = $derived(password.length >= settings.minLength);

  const rules = $derived.by(() => {
    const r: { valid: boolean; text: string }[] = [];
    if (settings.requiredLetter) {
      r.push({
        valid: /\w/.test(password),
        text: "The password needs to include at least one letter",
      });
    }
    if (settings.requiredNumber) {
      r.push({
        valid: /[0-9]/.test(password),
        text: "The password needs to include at least one number",
      });
    }
    if (settings.requiredSpecialChar) {
      r.push({
        valid: /[@$!%*#?&]/.test(password),
        text: "The password needs to include at least one special character",
      });
    }
    return r;
  });
</script>

{#if value}
  <ul class={classes.descriptionList}>
    <li class={classes.descriptionItem}>
      {#if lengthValid}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          class={classes.descriptionItemIcon}
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path
            fill="green"
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
          />
        </svg>
      {:else}
        <div class={classes.descriptionItemPlaceholder}></div>
      {/if}
      <span>
        The password needs to contain at least {settings.minLength} characters
      </span>
    </li>
    {#each rules as rule, i (i)}
      <li class={classes.descriptionItem}>
        {#if rule.valid}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            class={classes.descriptionItemIcon}
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path
              fill="green"
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
            />
          </svg>
        {:else}
          <div class={classes.descriptionItemPlaceholder}></div>
        {/if}
        <span>{rule.text}</span>
      </li>
    {/each}
  </ul>
{/if}