<script lang="ts">
  import type { WidgetProps } from "@fab4m/fab4m";

  type Props = WidgetProps<number, unknown>;

  let { component, value, onChange, name, id }: Props = $props();

  let rating = $state(value ?? 0);
  let hoverRating = $state(0);

  function setRating(newRating: number) {
    rating = newRating;
    onChange(newRating);
  }

  function setHover(newRating: number) {
    hoverRating = newRating;
  }

  function clearHover() {
    hoverRating = 0;
  }

  const displayRating = $derived(hoverRating || rating);
</script>

<div class="rating-widget">
  <label for={id}>{component.label}</label>
  {#if component.description}
    <p class="description">{component.description}</p>
  {/if}
  <div class="stars" id={id} role="radiogroup" aria-label={component.label}>
    {#each [1, 2, 3, 4, 5] as star}
      <button
        type="button"
        class="star {star <= displayRating ? 'filled' : ''}"
        onclick={() => setRating(star)}
        onmouseenter={() => setHover(star)}
        onmouseleave={clearHover}
        aria-label="{star} star{star > 1 ? 's' : ''}"
        aria-checked={star === rating}
        role="radio"
      >
        {star <= displayRating ? '★' : '☆'}
      </button>
    {/each}
  </div>
  <input type="hidden" {name} value={rating} />
</div>

<style>
  .rating-widget {
    margin-bottom: 1rem;
  }
  
  label {
    display: block;
    font-weight: 600;
    margin-bottom: 0.25rem;
  }
  
  .description {
    font-size: 0.875rem;
    color: #666;
    margin: 0 0 0.5rem 0;
  }
  
  .stars {
    display: flex;
    gap: 0.25rem;
  }
  
  .star {
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    padding: 0;
    color: #ddd;
    transition: color 0.15s ease;
  }
  
  .star:hover {
    transform: scale(1.1);
  }
  
  .star.filled {
    color: #ffc107;
  }
</style>
