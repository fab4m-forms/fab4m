<script lang="ts">
  import { Component } from "svelte";
  import { FormDefinition, Theme } from "@fab4m/fab4m";
  import ElementWrapper from "./ElementWrapper.svelte";

  /**
   * Renders the pager for multipage forms.
   * This component is mostly used internally, but it's useful if you need to create a custom
   * Form view component.
   * @group Svelte API
   */
  type Props = {
    /** The current form part. */
    part: number;
    /** The total number of form parts. */
    noParts: number;
    /** The current form theme. */
    theme: Theme;
    /** The form this pager is rendered for. */
    form: FormDefinition;
    /** True if there is a previous part. */
    hasPrevPart: boolean;
    /** True if there is a next part. */
    hasNextPart: boolean;
    /** This function will be called when the user requests to go back.*/
    goBack: () => void;
    /** Set this to true to disable the next and previous buttons. */
    disabled?: boolean;
    /** Set this to true to disable the submit button. */
    hideSubmit?: boolean;
    /** If needed you can provide custom go back svelte component */
    back?: Component<{ goBack: () => void }>;
  };

  let {
    part,
    noParts,
    theme,
    form,
    hasPrevPart,
    hasNextPart,
    goBack,
    disabled,
    hideSubmit,
    back: BackComponent,
  }: Props = $props();

  let classes = $derived(theme.classes);
</script>

{#if noParts === 1}
  {#if !hideSubmit}
    <ElementWrapper {theme}>
      <input
        type="submit"
        {disabled}
        class={classes.submitButton}
        value={form.labels?.submit ?? "Save"}
      />
    </ElementWrapper>
  {/if}
{:else}
  <ElementWrapper {theme}>
    <div class={classes.pager}>
      {#if part > 0}
        {#if BackComponent}
          <BackComponent {goBack} />
        {:else}
          <button
            value="prev"
            name="action"
            type="button"
            onclick={goBack}
            class={classes.pagerPrevious}
          >
            {form.labels?.previous ?? "Previous"}
          </button>
        {/if}
      {/if}
      {#if hasNextPart}
        <button value="next" name="action" class={classes.pagerNext}>
          {form.labels?.next ?? "Next"}
        </button>
      {:else if !hideSubmit}
        <button
          value="complete"
          name="action"
          {disabled}
          class={classes.pagerComplete}
        >
          {form.labels?.complete ?? "Complete"}
        </button>
      {/if}
    </div>
  </ElementWrapper>
{/if}
