<script lang="ts">
  import type { ThemeClasses, ValidationError } from "@fab4m/fab4m";

  let {
    errors,
    classes,
  }: {
    errors: ValidationError[];
    classes: ThemeClasses;
  } = $props();
</script>

<ul class={classes.errorList}>
  {#each errors as error}
    <li class={classes.errorItem}>{error.message}</li>
  {/each}
</ul>
